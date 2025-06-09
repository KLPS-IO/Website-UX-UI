from sqlalchemy import create_engine
import pandas as pd
import snowflake.connector
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Snowflake credentials
# sf_user = os.getenv('SNOWFLAKE_USER')
# sf_password = os.getenv('SNOWFLAKE_PASSWORD')
# sf_account = os.getenv('SNOWFLAKE_ACCOUNT')

# Insert data into the local database
with engine.connect() as conn:
    for _, row in df.iterrows():
        conn.execute("""
            INSERT INTO processed_survey_data (discomfort_reason, shopping_channel, willingness_to_pay_range)
            VALUES (%s, %s, %s)
        """, (row["discomfort_reason"], row["shopping_channel"], row["willingness_to_pay_range"]))



# PostgreSQL credentials
db_user = os.getenv('POSTGRES_USER')
db_password = os.getenv('POSTGRES_PASSWORD')
db_host = os.getenv('POSTGRES_HOST')
db_port = os.getenv('POSTGRES_PORT')
db_name = os.getenv('POSTGRES_DB')

# Define SQL query
query = "SELECT * FROM survey_raw_data"

try:
    # Connect to PostgreSQL and retrieve data
    print("Connecting to PostgreSQL...")
    # PostgreSQL local database connection
    engine = create_engine('postgresql://postgres:password@localhost:5432/local_snowflake')
    # Insert data into the local database
with engine.connect() as conn:
    for _, row in df.iterrows():
        conn.execute("""
            INSERT INTO processed_survey_data (discomfort_reason, shopping_channel, willingness_to_pay_range)
            VALUES (%s, %s, %s)
        """, (row["discomfort_reason"], row["shopping_channel"], row["willingness_to_pay_range"]))

    df = pd.read_sql(query, engine)
    print("PostgreSQL data loaded successfully.")

    # Preview the DataFrame
    print("Loaded data from PostgreSQL:")
    print(df.head())

    # Process top locations
    top_locations = df['location'].value_counts()
    print("Top locations:")
    print(top_locations)

except Exception as e:
    print(f"Error connecting to PostgreSQL or retrieving data: {e}")
    df = None  # Set df to None so the script doesn't proceed with invalid data.

if df is not None:
    try:
        # Connect to Snowflake
        print("Connecting to Snowflake...")
        conn = snowflake.connector.connect(
            user=sf_user,
            password=sf_password,
            account=sf_account
        )
        cursor = conn.cursor()

        # Insert data into Snowflake
        for _, row in df.iterrows():
            cursor.execute("""
                INSERT INTO processed_survey_data (id, discomfort_reason, shopping_channel, willingness_to_pay_range)
                VALUES (%s, %s, %s, %s)
            """, (row["id"], row["discomfort_reason"], row["shopping_channel"], row["willingness_to_pay_range"]))
        
        conn.close()
        print("Data successfully inserted into Snowflake.")

    except Exception as e:
        print(f"Error connecting to Snowflake or inserting data: {e}")
