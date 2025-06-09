--
-- PostgreSQL database dump
--

-- Dumped from database version 14.14 (Homebrew)
-- Dumped by pg_dump version 14.14 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: data_logs; Type: TABLE; Schema: public; Owner: emmamendez
--

CREATE TABLE public.data_logs (
    log_id integer NOT NULL,
    table_name text NOT NULL,
    operation text NOT NULL,
    old_value jsonb,
    new_value jsonb,
    changed_by text,
    change_timestamp timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.data_logs OWNER TO emmamendez;

--
-- Name: data_logs_log_id_seq; Type: SEQUENCE; Schema: public; Owner: emmamendez
--

CREATE SEQUENCE public.data_logs_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.data_logs_log_id_seq OWNER TO emmamendez;

--
-- Name: data_logs_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: emmamendez
--

ALTER SEQUENCE public.data_logs_log_id_seq OWNED BY public.data_logs.log_id;


--
-- Name: survey_processed_data; Type: TABLE; Schema: public; Owner: emmamendez
--

CREATE TABLE public.survey_processed_data (
    id integer NOT NULL,
    user_id integer NOT NULL,
    question_id integer NOT NULL,
    processed_response text,
    aggregated_score double precision,
    processing_timestamp timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.survey_processed_data OWNER TO emmamendez;

--
-- Name: survey_processed_data_id_seq; Type: SEQUENCE; Schema: public; Owner: emmamendez
--

CREATE SEQUENCE public.survey_processed_data_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.survey_processed_data_id_seq OWNER TO emmamendez;

--
-- Name: survey_processed_data_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: emmamendez
--

ALTER SEQUENCE public.survey_processed_data_id_seq OWNED BY public.survey_processed_data.id;


--
-- Name: survey_raw_data; Type: TABLE; Schema: public; Owner: emmamendez
--

CREATE TABLE public.survey_raw_data (
    id integer NOT NULL,
    name text,
    location text,
    age integer,
    job_title text,
    profession_level text,
    favourite_brands text,
    underwear_changes text,
    shopping_preference text,
    underwear_type text,
    relatable_statement text,
    discomfort_reason text,
    priority_issues text,
    brand_preference_reason text,
    willingness_to_pay text,
    clip_off_preference text,
    "timestamp" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.survey_raw_data OWNER TO emmamendez;

--
-- Name: survey_raw_data_id_seq; Type: SEQUENCE; Schema: public; Owner: emmamendez
--

CREATE SEQUENCE public.survey_raw_data_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.survey_raw_data_id_seq OWNER TO emmamendez;

--
-- Name: survey_raw_data_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: emmamendez
--

ALTER SEQUENCE public.survey_raw_data_id_seq OWNED BY public.survey_raw_data.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: emmamendez
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(150) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO emmamendez;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: emmamendez
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO emmamendez;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: emmamendez
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: data_logs log_id; Type: DEFAULT; Schema: public; Owner: emmamendez
--

ALTER TABLE ONLY public.data_logs ALTER COLUMN log_id SET DEFAULT nextval('public.data_logs_log_id_seq'::regclass);


--
-- Name: survey_processed_data id; Type: DEFAULT; Schema: public; Owner: emmamendez
--

ALTER TABLE ONLY public.survey_processed_data ALTER COLUMN id SET DEFAULT nextval('public.survey_processed_data_id_seq'::regclass);


--
-- Name: survey_raw_data id; Type: DEFAULT; Schema: public; Owner: emmamendez
--

ALTER TABLE ONLY public.survey_raw_data ALTER COLUMN id SET DEFAULT nextval('public.survey_raw_data_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: emmamendez
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: data_logs; Type: TABLE DATA; Schema: public; Owner: emmamendez
--

COPY public.data_logs (log_id, table_name, operation, old_value, new_value, changed_by, change_timestamp) FROM stdin;
1	survey_raw_data	INSERT	\N	{"response": "Uncomfortable fabric"}	admin	2024-11-21 18:12:13.253564
\.


--
-- Data for Name: survey_processed_data; Type: TABLE DATA; Schema: public; Owner: emmamendez
--

COPY public.survey_processed_data (id, user_id, question_id, processed_response, aggregated_score, processing_timestamp) FROM stdin;
\.


--
-- Data for Name: survey_raw_data; Type: TABLE DATA; Schema: public; Owner: emmamendez
--

COPY public.survey_raw_data (id, name, location, age, job_title, profession_level, favourite_brands, underwear_changes, shopping_preference, underwear_type, relatable_statement, discomfort_reason, priority_issues, brand_preference_reason, willingness_to_pay, clip_off_preference, "timestamp") FROM stdin;
1	No answer	Birmingham	0	Software engineer	E Grade	Primark	Digging in my crotch area	In-shop | Online	High Waist Briefs | Boy shorts  | Cheeky (French)	Yes I wear shapewear | I do wear waist trainers | Regularly wear shapewear 	Bulging over the shapewear	Comfortability on bottom | Wedgies - stop them | Remove visible panty lines	Primark for affordable bulk buy	$20 - $50 - Underwear and bras purchased together	No answer	2024-11-21 23:39:25.753852
2	No answer	Birmingham UK	0	Passenger Assistant	Assistant	Snoggy	More comfortable fit.	Online | In-shop	High Waist Briefs	Regularly wear shapewear 	Either too big or a bit small.	Fit is a priority | Remove visible panty lines | Sizing is priority | Comfortability around waist | Quality is important | Ease of removing | Comfortability on bottom | Wedgies - stop them | Fabric choice is a priority	Snoggy... comfortable fit and material.	$20 - $50 - Underwear and bras purchased together	No answer	2024-11-21 23:39:25.753852
3	No answer	Wednesbury	0	Ward clerk	No Answer	Asda	To flatten stomach	In-shop	Full (others)	No I don't, but would try shapewear 	No Answer	Remove visible panty lines | Comfortability on bottom | Quality is important | Fit is a priority | Fabric choice is a priority | Sizing is priority	Cotton	$15 - $35 per bra	No answer	2024-11-21 23:39:25.753852
4	Ebony phillips	Birmingham	0	Process Excellence Manager	Junior Management	Charnos, Boux Avenue, Marks and Spencer, Freya, Triumph.	Breathable fabrics!	Online | In-shop	Thong | Briefs | High Waist Briefs	Rarely wear shapewear 	I have an ample bottom. Buying briefs that are the right size in the waist but don’t cover my cheeks sufficiently is annoying. Love things but sometimes they chafe.	Remove visible panty lines | Quality is important | Comfortability on bottom | Having cool breathable fabrics. Many of the prettiest knickers don’t let me breathe and stay cool.  (others)	Charnos. Pretty, breathable, long lasting and high quality.	$20 - $50 - Underwear and bras purchased together	No answer	2024-11-21 23:39:25.753852
5	Nyarobi	Birmingham, UK	0	Croupier, & student	Senior dealer/inspector	H&M, Ann Summers	The obvious seam in full briefs, when wearing trousers	undefined	Thong | High Waist Briefs	Yes I wear shapewear | I do wear waist trainers	The obvious seam.	Remove visible panty lines | Fabric choice is a priority | Wedgies - stop them | Quality is important	Ann summers, best pricing, like the designs and quality.	$20 - $50 - Underwear and bras purchased together	No answer	2024-11-21 23:39:25.753852
6	Jade	Wolverhampton	0	Seamstress	No Answer	I can make my own	Make more comfortable underwear	In-shop | Or make my own  (others)	Briefs | High Waist Briefs | Bikini	Will start wearing once had my baby (others)	Getting stuck in your bum	Wedgies - stop them | Remove visible panty lines | Fabric choice is a priority | Sizing is priority | Comfortability on bottom | Fit is a priority	Don't have one	Always under $5 for 3 pairs	No answer	2024-11-21 23:39:25.753852
7	Tina	Bath	0	Doctoral researcher	No Answer	Primark or Victoria secret	Price	In-shop	Thong	Rarely wear shapewear 	Panty liners	Comfortability on bottom | Quality is important | Remove visible panty lines | Comfortability around waist	I don’t have one	Always under $5 for 3 pairs	No answer	2024-11-21 23:39:25.753852
8	Mirian	Luton	0	Resident Liaison Officer	No Answer	Primark and Ann Summers	Period underwear doesn’t need to look like Bridget Jones underwear	In-shop	Cheeky (French) | Thong | Tanga	Yes I wear shapewear	Getting a wedgie	Wedgies - stop them | Ease of removing | Comfortability on bottom | Sizing is priority	Don’t have one	$20 - $50 - Underwear and bras purchased together	No answer	2024-11-21 23:39:25.753852
9	Charmaine barrett	Westmidlands	0	No Answer	CBT Councillor	M&S	Personally it has to be the material and the feeling against my body.	In-shop	Briefs	No I don't wear shapewear and wouldn't 	The material.	Menstruation time should be considered (others)	M&S Quality and fit.	$15 - $35 per bra	No answer	2024-11-21 23:39:25.753852
10	Samaya	Birmingham	0	No Answer	No Answer	Unndr	Ease of putting them on and taking them off	In-shop | Online	Bikini	No I don't, but would try shapewear 	Wedgies	Remove visible panty lines | Fabric choice is a priority | Quality is important | Fit is a priority	Unndr, variety of cute styles	$20 - $50 - Underwear and bras purchased together	No answer	2024-11-21 23:39:25.753852
11	Ayroza	Birmingham	0	No Answer	No Answer	Victoria’s Secret, Calvin Klein, Primark, Ann Summers, Nubian Skin	Variety in skin tones, Larger range of sizes, more illusion styles for my skin tone, more cost effective	undefined | In-shop	Thong | High Waist Briefs | Briefs | Boy shorts 	Rarely wear shapewear 	The elastic around my groin and thigh is sometimes too tight	Quality is important | Sizing is priority | Remove visible panty lines | Wedgies - stop them | Fit is a priority	I have a lot of styles from Ann Summers \nmainly due to cost and styles. They have a large range of sizes.	$20 - $50 - Underwear and bras purchased together	No answer	2024-11-21 23:39:25.753852
12	Maureen Griffith	Epsom Downs, Surrey	0	Retired Business Manager	Manager	No special brand	No changes required	In-shop	High Waist Briefs	Regularly wear shapewear 	No discomfort	Fit is a priority | Comfortability around waist | Sizing is priority | Fabric choice is a priority | Comfortability on bottom | Quality is important	No special brand	$5-$15 per bra	No answer	2024-11-21 23:39:25.753852
13	Dulcie Phoenix	Wolverhampton	0	Home Carer	No Answer	As I’m of a certain age and have a medical condition, also plus size, (Dress size 26) I go for the leak proof type. I do a Google search and see what it throws up	Higher waisted knickers	Online	High Waist Briefs	Yes I wear shapewear	Rarely get them over my belly	Sizing is priority | Fabric choice is a priority | Comfortability around waist | Fit is a priority | Wedgies - stop them | Remove visible panty lines | Ease of removing | Comfortability on bottom | Quality is important	I search regularly on ASOS to find my size as I’m a 44h	$15 - $35 per bra	No answer	2024-11-21 23:39:25.753852
14	Donna	Birmingham	0	No Answer	No Answer	Ann summers, marks and spencers	Bras that fit well that cover the extra flesh under the arm so it's not sticking out..and more selection of pretty and well fitting knickers	undefined	Briefs | High Waist Briefs	Yes I wear shapewear	No Answer	Wedgies - stop them | Quality is important | Sizing is priority | Fabric choice is a priority | Fit is a priority	Marks and spencer nice selection, fit  and quality	$20 - $50 - Underwear and bras purchased together	No answer	2024-11-21 23:39:25.753852
15	Shanelle	United Kingdom	0	No Answer	No Answer	Marks and Spencers, Monkl, H&M	the sizes, style, shape, comfortability and price	In-shop	High Waist Briefs	No I don't, but would try shapewear  | No I don't wear shapewear and wouldn't 	it going in your bum	Quality is important | Wedgies - stop them | Fabric choice is a priority | Fit is a priority | Sizing is priority | Comfortability on bottom | Comfortability around waist | Ease of removing | Remove visible panty lines | Style  (others)	Marks and Spencers because the quality is amazing.. The cost is great and the fit is great too. They also cater to young and old in terms of Style	$5-$15 per bra	No answer	2024-11-21 23:39:25.753852
16	Brittany	Birmingham	0	Recovery Housing referral coordinator	Area service operator	Asda primark	Softer material	In-shop	Cheeky (French) | Thong | Tanga	I do wear waist trainers	No Answer	Fit is a priority	No Answer	$20 - $50 - Underwear and bras purchased together	No answer	2024-11-21 23:39:25.753852
17	Solagne Lake	Birmingham	0	Software Engineer	Junior	Fenty, Bravissimo and Simply Be, Hanes.	More cotton crutches. Bigger bra cups in sexier styles	In-shop | undefined	High Waist Briefs | Boy shorts 	Yes I wear shapewear | Rarely wear shapewear 	Riding up into my butt	Fit is a priority | Sizing is priority | Remove visible panty lines | Comfortability on bottom | Quality is important | Fabric choice is a priority	Hanes	$35 upwards per bra	No answer	2024-11-21 23:39:25.753852
18	Rolana	Birmingham	0	Mentor & Charity CEO	Senior/Leader	Pretty much anywhere haha Shein, Temu, Primark, Pretty lil thing	All seamless and more breathable	Online | In-shop	Briefs | Boy shorts  | Hipsters | Cheeky (French) | Bikini | Thong | Tanga	Rarely wear shapewear 	Can be too tight and hitch up sometimes	Remove visible panty lines | Wedgies - stop them | Ease of removing | Fabric choice is a priority | Quality is important | Comfortability on bottom | Fit is a priority	Don’t have one but I do like Tommy Hilfiger, material wise and just how they're made, style	$20 - $50 - Underwear and bras purchased together	No answer	2024-11-21 23:39:25.753852
19	Jen	Birmingham	0	Social action coordinator	No Answer	Anne summers\nH and M\nPrimary	Support bras with no underwire	undefined | In-shop	Cheeky (French) | G-String | Boy shorts  | Thong	No I don't wear shapewear and wouldn't 	Nothing	Remove visible panty lines | Quality is important	I don’t have one	$20 - $50 - Underwear and bras purchased together	No answer	2024-11-21 23:39:25.753852
20	Marsha mullings	Chesterfield	0	Homemaker	No Answer	Sainsburys	Its the bras that mess with me tbh panties r okay ya know	In-shop	Briefs | Cheeky (French)	No I don't, but would try shapewear 	N/a	Quality is important | Fit is a priority | Comfortability around waist | Wedgies - stop them	M&s	$20 - $50 - Underwear and bras purchased together	No answer	2024-11-21 23:39:25.753852
21	Judy Gatiss	Birmingham	0	Writer	Senior	M&S, TK Maxx, Fenty	Better fit for smaller knickers like thongs that sometimes dig into the hips and abdomen	In-shop	Cheeky (French) | Bikini	No I don't wear shapewear and wouldn't 	Not being particularly friendly for sanitary pads	Remove visible panty lines | Quality is important | Fabric choice is a priority | Comfortability on bottom	It used to be M&S for variety, styles, price and comfort but the quality has deteriorated and the same quality everyday pants are available in Primark. I don't have a favorite at the minute. Used to love La Senza but I'm generally not finding what I like these days	$20 - $50 - Underwear and bras purchased together	No answer	2024-11-21 23:39:25.753852
22	Claudeth Mcleod	West Midlands	0	CEO	Executive Director	Miu Miu	Nothing	Online | In-shop	Thong | Cheeky (French) | G-String	No I don't wear shapewear and wouldn't 	Nothing	Ease of removing | Comfortability around waist | Fit is a priority | Remove visible panty lines | Fabric choice is a priority | Sizing is priority | Quality is important	Miu Miu they have a variety of fabrics, and colours.	$35 upwards per bra	No answer	2024-11-21 23:39:25.753852
23	Dee	Handsworth Birmingham	0	Full time Student & part time CSCS Cleaner	Degree in food and nutrition	Local Supermarket / Amazon	I don’t know	In-shop | Online	High Waist Briefs	No I don't, but would try shapewear 	Good fit	Comfortability around waist | Quality is important | Sizing is priority | Comfortability on bottom | Fit is a priority	Wirarpa high waisted full coverage cotton knickers. Feeling well covered, Im a plus size women (for now anyway)	$35 upwards per bra	No answer	2024-11-21 23:39:25.753852
24	Chanel-Monét	Birmingham, UK	0	Entrepreneur	CEO	Ann Summers	Having my size in the styles/designs that I like	In-shop | undefined	Thong	I do wear waist trainers	If the fabric isn't nice and soft	Fabric choice is a priority | Fit is a priority | Sizing is priority | Quality is important	Ann summers	$15 - $35 per bra	No answer	2024-11-21 23:39:25.753852
25	Charlene Hunter	London	0	CEO	C-Suite	Marks & Spencers / Boux Avenue	Consistent Sizing	Online | In-shop	Briefs | High Waist Briefs | Boy shorts  | Cheeky (French)	Yes I wear shapewear | Rarely wear shapewear 	Nothing	Sizing is priority | Comfortability around waist | Quality is important	No Answer	$50 - $150 - underwear and bras purchased together	No answer	2024-11-21 23:39:25.753852
26	No Answer	Birmingham	0	No Answer	No Answer	Bravissimo - bras and Primark - pants	The price for bigger sizes - very expensive	In-shop	High Waist Briefs | Boy shorts  | Thong	Rarely wear shapewear 	Ill filling that don’t cover bottom and gives a wedgey lol	Comfortability on bottom | Comfortability around waist | Fabric choice is a priority | Remove visible panty lines	Do t have one. I like bravissimo bras though, high quality…last long	$15 - $35 per bra	No answer	2024-11-21 23:39:25.753852
27	Rachel Warren	Birmingham	0	Teacher	Senior manager	Shien	No visible lines and more comfortable thongs. Wider at the front too to cover stomach pouch, but still sexy thong design.	Online | In-shop	Thong	Rarely wear shapewear 	Startched rough material	Wedgies - stop them | Comfortability on bottom | Sizing is priority | Remove visible panty lines | Fabric choice is a priority	George, comfortable and stretchy wear	$5-$15 per bra	No answer	2024-11-21 23:39:25.753852
28	Ashley Merritt	Rex, GA	0	Training Coordinator	Mid level	Victoria Secret or Walmart	Affordability and breathable material	In-shop	Thong | Bikini	No I don't, but would try shapewear 	Wedgies	Wedgies - stop them | Remove visible panty lines	Unsure	$50 - $150 - underwear and bras purchased together	No answer	2024-11-21 23:39:25.753852
29	Javina	Wolverhampton	0	No Answer	Level one hair and beauty	Primark	No to sure	In-shop	Briefs	Yes I wear shapewear	Sometimes they can chafe	Wedgies - stop them | Sizing is priority	I don’t have a favorite	Always under $5 for 3 pairs	No answer	2024-11-21 23:39:25.753852
30	Lamara	Birmingham	0	No Answer	No Answer	Savage x, m&s	Make them more comfortable.	Online	Briefs | Cheeky (French)	No I don't, but would try shapewear 	Fabric is not always breathable	Remove visible panty lines | Fit is a priority | Fabric choice is a priority	No Answer	$15 - $35 per bra	No answer	2024-11-21 23:39:25.753852
31	Harjeet	London	0	Teacher	No Answer	Ann summers is my favourite, h&m, primark	Make it wash better, if I have something nice I can’t put it in the washing machine as it would be ruined!	In-shop | undefined	Thong | Tanga | G-String | Hipsters | If I’m on my period  (others)	No I don't, but would try shapewear 	Some material! Recently found satin knickers to be more comfortable	Quality is important | Fabric choice is a priority | Remove visible panty lines | Fit is a priority | Comfortability around waist | Comfortability on bottom	Ann summers, comfortable, sexy and good quality!	$35 upwards per bra	No answer	2024-11-21 23:39:25.753852
32	Sarah Edmead	Birmingham	0	No Answer	No Answer	M&S	High enough for your belly. Shape wear not having seams running down the front of the knickers	In-shop	High Waist Briefs	Yes I wear shapewear	Getting stuck in my bum fat rolling out at top not seam free knickers that hold you in	Fabric choice is a priority | Quality is important | Remove visible panty lines | Comfortability around waist | Ease of removing | Sizing is priority | Wedgies - stop them | Fit is a priority | Comfortability on bottom	Debenhams	$20 - $50 - Underwear and bras purchased together	No answer	2024-11-21 23:39:25.753852
33	Marika	Birmingham	0	Innovation Manager	Senior	Lounge and Boux Avenue	Elasticity waist, I like the elasticity to have adequate stretch but still look beautifully designed.	In-shop | Online	Cheeky (French) | Bikini | High Waist Briefs	No I don't, but would try shapewear 	N/a	Remove visible panty lines | Wedgies - stop them | Comfortability around waist | Quality is important	Lounge have beautiful designs and suitable for comfortability, they are also a sustainable brand.	$50 - $150 - underwear and bras purchased together	No answer	2024-11-21 23:39:25.753852
34	Tynisha	Stafford	0	Ceo	Senior	I don't wear them	I like to be free	In-shop	Cheeky (French)	Yes I wear shapewear	Nothing	Wedgies - stop them	Na	$35 upwards per bra	No answer	2024-11-21 23:39:25.753852
35	Sheree Obatomi	Wolverhampton	0	Nursery Nurse Level 3	Supervisory	Wuka, Asda, Primark, Fenty Beauty	More comfortable and breathable using cotton/the best materials.	In-shop | Online	Cheeky (French) | Thong | G-String | High Waist Briefs	Rarely wear shapewear 	Un breathable material, designs not suited to our shapes making it feel uncomfortable at times to wear.	Fit is a priority | Fabric choice is a priority | Comfortability on bottom | Quality is important | Sizing is priority | Ease of removing	I love Wuka pants because they are eco friendly, comfy and multi useable. They come in a variety of shapes, sizes for all ages etc.	$10 - $35 for packs of underwear	No answer	2024-11-21 23:39:25.753852
36	Cherette Bynoe	Birmingham	0	No Answer	No Answer	Boux avenue	Maybe the prices. Should be more offers/discount for multiple purchases. Who buys only one set?	Online	Cheeky (French)	Rarely wear shapewear 	Big bums have the issue of wearing their size but then the waistline can be too big.	Quality is important | Fit is a priority | Comfortability around waist | Sizing is priority | Remove visible panty lines | Wedgies - stop them	No Answer	$20 - $50 - Underwear and bras purchased together	No answer	2024-11-21 23:39:25.753852
37	Marcia Patrice	Atlanta Georgia	0	Artist	Care Navigator	Hayes	Fully cotton that help me not sweat down there. Help keep me cool and not sweat lol	Online | In-shop	Briefs | High Waist Briefs | Boy shorts  | Cheeky (French) | Bikini | Thong	Yes I wear shapewear | I do wear waist trainers	No Answer	Fabric choice is a priority | Comfortability on bottom | Sizing is priority | Fit is a priority | Quality is important | Comfortability around waist | Remove visible panty lines	Jockey	$20 - $50 - Underwear and bras purchased together	No answer	2024-11-21 23:39:25.753852
38	Georgina	Jamaica	0	Nurse	No Answer	George	The line that digs in	In-shop	High Waist Briefs | Cheeky (French)	No I don't, but would try shapewear  | I do wear waist trainers	Riding inside bum	Comfortability on bottom | Fit is a priority | Remove visible panty lines | Comfortability around waist | Wedgies - stop them | Quality is important	George good control under clothes	$20 - $50 - Underwear and bras purchased together	No answer	2024-11-21 23:39:25.753852
39	Lexie richards	Lozells Birmingham b19 1sz	0	Grill chef	Assistant	Victoria secrets,primark,marks &Spencer’s	Make it unusual and different	In-shop | undefined	Briefs | Hipsters | Cheeky (French) | Bikini | Thong	Yes I wear shapewear	Is when you see the knickers line in the print of your trousers	Wedgies - stop them | Comfortability on bottom | Fit is a priority | Quality is important | Ease of removing | Remove visible panty lines	Victoria as some of there knickers are so good in quality even thought it’s expensive	$50 - $150 - underwear and bras purchased together	No answer	2024-11-21 23:39:25.753852
40	Desrene	Stafford	0	No Answer	No Answer	Currently unsure of favourite. However I like the designs of Savage Fenty underwear. I usually buy underwear from Primark & Tesco.	Make shape wear more attractive.	In-shop | undefined	High Waist Briefs | Boy shorts  | Cheeky (French) | Thong	Yes I wear shapewear | I do wear waist trainers	When it’s not securing the lower Tummy lol	Remove visible panty lines | Fit is a priority | Comfortability around waist	I don’t currently have a favourite, however I’d choose Savage Fenty for the colours & designs	$20 - $50 - Underwear and bras purchased together	No answer	2024-11-21 23:39:25.753852
41	Nneoma	London	0	Software engineer	D grade	Primark, M&S, Savage X Fenty	I’d prefer it if all of them were seamless. That way you can wear all your underwear without worrying about a VPL	undefined | Online	Boy shorts 	Yes I wear shapewear | Rarely wear shapewear 	\N	Fabric choice is a priority | Remove visible panty lines | Comfortability around waist	Chantelle. They make bigger and comfortable bras with wide back straps that are actually cute.	$50 - $150 - underwear and bras purchased together	No answer	2024-11-21 23:39:25.753852
42	Lorell	Minworth	0	Specialist Youth Worker	Degree	Don’t wear underwear, don’t have a particular brand, when I do wear bras Ann summers or primark are good for me	No straps on bras atall	In-shop | undefined	Boy shorts 	Rarely wear shapewear 	The lines you see when wearing clothes and the fact it rides in your bottom	Fabric choice is a priority | Sizing is priority | Wedgies - stop them | Comfortability around waist | Comfortability on bottom	Don’t have one	$20 - $50 - Underwear and bras purchased together	No answer	2024-11-21 23:39:25.753852
43	Deneita	Birmingham	0	Director	Non	Ann summers	Make them all be made from better materials	In-shop | undefined	Cheeky (French) | Tanga	No I don't, but would try shapewear 	The fact they don't stay in place	Comfortability on bottom | Quality is important | Wedgies - stop them | Fabric choice is a priority	Primark as they are cheap	$20 - $50 - Underwear and bras purchased together	No answer	2024-11-21 23:39:25.753852
44	Happy	Birmingham	0	No Answer	No Answer	Boux Avenue, George at Asda, Ann Summers	The disparity in cost and style the bigger your cup size.	Online | undefined | In-shop	Cheeky (French)	No I don't wear shapewear and wouldn't 	It having VPL	Remove visible panty lines | Fabric choice is a priority | Fit is a priority	Boux avenue they have a good variety	$20 - $50 - Underwear and bras purchased together	No answer	2024-11-21 23:39:25.753852
45	Kimberly Redway	Birmingham	0	No Answer	No Answer	Bravissimo, M&S	The fit as sometimes the underwear isn't comfortable	Online	High Waist Briefs	No I don't wear shapewear and wouldn't 	The knickers I buy are very comfortable- not particular stylish but comfortable.	Wedgies - stop them	Bravissimo for bras as they have a wide range but also the fit is amazing and I've been loyal to the brand since I was about 19 (I'm 35 now.) However, lately the quality has been letting it down. I'm considering changing brands as the bras easily break (I always break underwires) and the material easily degrades. I am beginning to think the price (as they are fairly pricey even when on sale) is not worth it as they don't last long.	$35 upwards per bra	No answer	2024-11-21 23:39:25.753852
46	Joy Anibaba	Solihull	0	Delivery Lead	BA hons	M & S	Fit and colours. I don't want anything frumpy or too tight.	In-shop | Online	Boy shorts  | Hipsters | Cheeky (French)	Yes I wear shapewear	Too tight or too loose. I have a sticky out bum so it doesn't always fit well.	Comfortability on bottom | Sizing is priority | Ease of removing | Fabric choice is a priority | Quality is important | Wedgies - stop them | Fit is a priority | Remove visible panty lines | Comfortability around waist	M&S shorts, fits well in black	$20 - $50 - Underwear and bras purchased together	No answer	2024-11-21 23:39:25.753852
47	Ijeoma Anthonia Joe	Birmingham	0	customer support professional	No Answer	M&S	fabric	In-shop | undefined	Thong | G-String	Yes I wear shapewear	the panty lines & maybe being too tight	Quality is important | Wedgies - stop them | Comfortability on bottom | Comfortability around waist | Remove visible panty lines | Fabric choice is a priority | Ease of removing | Fit is a priority	M&S comfort and fabric quality-also i get my right sizes there	$50 - $150 - underwear and bras purchased together	No answer	2024-11-21 23:39:25.753852
48	Samira W	Birmingham	0	DevOps engineer	Grade E	Primark, plain cotton briefs	Better quality for longevity	In-shop	Briefs | Hipsters	No I don't, but would try shapewear 	Wedgies😭	Comfortability on bottom | Wedgies - stop them	I have no favourite. I just buy what’s available quickly and re purchase when they’re worn.	$20 - $50 - Underwear and bras purchased together	No answer	2024-11-21 23:39:25.753852
49	No Answer	Birmingham UK	0	No Answer	No Answer	Don’t really have a favourite in very basic as long as the material is comfortable and breathable	I don’t know	In-shop	Boy shorts  | Hipsters | Briefs	No I don't, but would try shapewear 	The elasticity tightens around the groin	Fabric choice is a priority | Remove visible panty lines | Quality is important | Fit is a priority	No Answer	$20 - $50 - Underwear and bras purchased together	No answer	2024-11-21 23:39:25.753852
50	Christabel (Bel)	Birmingham	0	Director of Creative Agency	Director	nike, footasylum or jd	I’m not too sure to be honest	Online	Thong | G-String | Cheeky (French) | Boy shorts  | Briefs	I do wear waist trainers	material	Fit is a priority	I don’t currently have one	$20 - $50 - Underwear and bras purchased together	No answer	2024-11-21 23:39:25.753852
51	Cheryl	Birmingham	0	Engineer	Skilled d	Marks and Spencer	Black undies turning brown in the crotch	In-shop	Cheeky (French) | Boy shorts 	Rarely wear shapewear 	Wedgies	Comfortability on bottom | Comfortability around waist	Marks and Spencer. long lasting keeps shape and comfortable, true to size.	$15 - $35 per bra	No answer	2024-11-21 23:39:25.753852
52	Sashan	Birmingham	0	PA	No Answer	Tesco	I would make all underwear comfortable with no VPL	In-shop | Online	High Waist Briefs | Cheeky (French)	No I don't, but would try shapewear 	When they roll down under your belly	Comfortability around waist | Remove visible panty lines | Comfortability on bottom	Tesco boy pants	$10 - $35 for packs of underwear	No answer	2024-11-21 23:39:25.753852
53	Clare	Birmingham Sandwell	0	NHS	No Answer	Marks and Spencer, Ann Summers	That it becomes more affordable	In-shop | undefined	High Waist Briefs | Cheeky (French) | Thong | G-String	No I don't, but would try shapewear 	No sense of freedom	Wedgies - stop them | Fit is a priority | Sizing is priority | Comfortability on bottom | Quality is important	Any not fussed	$20 - $50 - Underwear and bras purchased together	No answer	2024-11-21 23:39:25.753852
54	No Answer	Sussex	0	No Answer	No Answer	John lewis, Panache	Better fit	Online	Briefs | Hipsters	Rarely wear shapewear 	Poor fit causing wedgies or the edges to dig in	Fit is a priority | Remove visible panty lines	Panache - good fit	$35 upwards per bra	No answer	2024-11-21 23:39:25.753852
55	Beatrice Ola	Grays, Essex	0	Software Engineer	Junior	Primark	I am not too fussy with underwear - so nothing	In-shop	Briefs	I do wear waist trainers	I would say wedgies when I wear a thong - so I just avoid them	Comfortability on bottom | Wedgies - stop them	I will admit I am cheap with underwear - so Primark	$20 - $50 - Underwear and bras purchased together	No answer	2024-11-21 23:39:25.753852
56	Paulette Boney	Hockley Birmingham	0	Semi retired business Proprietor.	Catering business owner.	Marks and spencers and other retailers.	It needs to design for women's comfort and shape.	In-shop	High Waist Briefs	Regularly wear shapewear  | Yes I wear shapewear	Not having a good fit around my leg causing Knicker line.	Quality is important | Fit is a priority | Remove visible panty lines	I don't have a favourite, I buy what I like and looks comfortable.	$10 - $35 for packs of underwear	No answer	2024-11-21 23:39:25.753852
57	Anon	Milton keynes	0	Chief community officer	Executive	M&s , anything soft and seamless	Period pants that you can actually wear on your period with heavy flow	Online | In-shop	High Waist Briefs | Cheeky (French) | Bikini | Thong | Tanga | Nah (others)	Yes I wear shapewear	Having to wear them all day	Fabric choice is a priority | Comfortability around waist | Remove visible panty lines | Comfortability on bottom | Fit is a priority | Quality is important	Skimms and anything that is similar	$10 - $35 for packs of underwear	No answer	2024-11-21 23:39:25.753852
58	Esther	Birmingham	0	Finance Analyst	No Answer	Primark	Sizing	In-shop	Hipsters	Yes I wear shapewear	Wedgies	Wedgies - stop them | Comfortability around waist | Sizing is priority | Remove visible panty lines	Primark - Cheap and cheerful	Always under $5 for 3 pairs	No answer	2024-11-21 23:39:25.753852
59	Lara	Midlands	0	Children and young people practitioner	No Answer	Matalan	Sizing	In-shop	Briefs | Boy shorts 	Yes I wear shapewear	The fit.	Wedgies - stop them | Comfortability around waist | Quality is important | Sizing is priority | Remove visible panty lines | Comfortability on bottom | Fit is a priority | Ease of removing | Fabric choice is a priority	Matalan because they are a good fit and reasonably priced.	$10 - $35 for packs of underwear	No answer	2024-11-21 23:39:25.753852
60	Juelz	Midlands	0	No Answer	No Answer	Don’t have one shop anywhere	well there’s so much design and fabric that there’s not much to change but just choose one i prefer	In-shop | undefined | Boux Avenue  (others)	High Waist Briefs | Hipsters | Boy shorts  | Briefs	Rarely wear shapewear 	Don’t know. sometimes depends on the material when they don’t sit properly on your waistline	Wedgies - stop them | Fit is a priority | Fabric choice is a priority | Comfortability on bottom | Comfortability around waist	No Answer	$20 - $50 - Underwear and bras purchased together	No answer	2024-11-21 23:39:25.753852
61	Natasza	Wolverhampton	0	No Answer	No Answer	Elle or vs or ck	For it not to be visible as much  while wearing something like leggings ,	In-shop | Online	Hipsters | Briefs | Boy shorts  | Cheeky (French)	No I don't, but would try shapewear 	If it tight or gives weggies or just in general the material is bad	Quality is important | Comfortability around waist | Remove visible panty lines | Wedgies - stop them | Comfortability on bottom | Sizing is priority	Victoria or ck it’s really comfortable and it’s not that expensive for the material	$5-$15 per bra	No answer	2024-11-21 23:39:25.753852
62	Gemma	Birmingham	0	Vocal Coach Business Owner	CEO	M&S, High Street	More seam less options,	Online	Bikini | Hipsters | Brazilian  (others)	Rarely wear shapewear 	Underwear that digs in and is uncomfortable	Wedgies - stop them | Comfortability around waist | Sizing is priority | Fit is a priority | Quality is important | Comfortability on bottom | Fabric choice is a priority	I have a number of lace Brazilian black underwear from matalan and George (asda) and have found these to be comfortable for me.	$20 - $50 - Underwear and bras purchased together	No answer	2024-11-21 23:39:25.753852
63	Yassmin	Birmingham	0	CX Analyst	No Answer	Marks and Spencers	Quality and durability	In-shop | undefined | Online	High Waist Briefs | Thong	Yes I wear shapewear	The stitching	Sizing is priority | Remove visible panty lines | Quality is important | Fit is a priority | Comfortability on bottom | Wedgies - stop them | Comfortability around waist	Matk and Spencers as they're true to size	$20 - $50 - Underwear and bras purchased together	No answer	2024-11-21 23:39:25.753852
64	Loveshia	Birmingham	0	Unknown	No Answer	Ann summers	Size	In-shop	Cheeky (French)	No I don't wear shapewear and wouldn't 	.material	Comfortability around waist | Comfortability on bottom | Sizing is priority | Remove visible panty lines | Fit is a priority | Quality is important | Fabric choice is a priority	Ann summers because it's sexy	$20 - $50 - Underwear and bras purchased together	No answer	2024-11-21 23:39:25.753852
65	Natasha	West midlands	0	Tutor and vocal coach	Nvq level 3 young people	New look, primark	More comfortable sexy underwear	Online	Thong	Yes I wear shapewear | Rarely wear shapewear 	Ones that are too small	Comfortability on bottom | Remove visible panty lines	Primark. Cheap and fit is great	$15 - $35 per bra	No answer	2024-11-21 23:39:25.753852
66	Denise	Solihull	0	Business Support Lead	Senior	Marks and Spencer	Underwear that shapes and lines  can’t be seen	In-shop	Briefs | High Waist Briefs | Boy shorts  | Hipsters	Rarely wear shapewear 	No Answer	Sizing is priority | Wedgies - stop them | Remove visible panty lines | Fit is a priority | Comfortability around waist | Ease of removing | Comfortability on bottom | Fabric choice is a priority | Quality is important	Marks and spencer- it’s all i know	$20 - $50 - Underwear and bras purchased together	No answer	2024-11-21 23:39:25.753852
67	Aaliyah	Birmingham	0	No Answer	No Answer	M&S, h&m/primark, victoria secret	To be more seamless and fitted according to your body shape	In-shop | Online	Briefs | Boy shorts  | Cheeky (French) | Bikini	No I don't, but would try shapewear 	Some materials are not suited for the gentle area. Also more knickers should be suited for periods.	Fabric choice is a priority | Comfortability around waist | Remove visible panty lines | Quality is important	No Answer	$20 - $50 - Underwear and bras purchased together	No answer	2024-11-21 23:39:25.753852
68	Cheri	Birmingham	0	No Answer	Bachelors	Majority of the time, due to convenience, I get my underwear from George Asda	Material	In-shop | undefined	Thong | High Waist Briefs	No I don't, but would try shapewear 	Unbreathable material, wedges	Fabric choice is a priority | Fit is a priority | Wedgies - stop them	Don’t have one	$15 - $35 per bra	No answer	2024-11-21 23:39:25.753852
69	April McPherson	Georgia	0	Claims Associate	No Answer	Victoria’s Secret	I’d make the bras my size have cuter options.	In-shop	Cheeky (French)	Rarely wear shapewear 	That I’m expected to daily.	Quality is important | Fabric choice is a priority | Comfortability on bottom | Remove visible panty lines | Comfortability around waist	Victoria’s Secret it’s cute and convenient	$20 - $50 - Underwear and bras purchased together	No answer	2024-11-21 23:39:25.753852
70	Sapphire	Birmingham	0	No Answer	No Answer	Primark, La senza, Ann Summers	To wear more brighter colours	In-shop | undefined	Briefs | High Waist Briefs	No I don't, but would try shapewear 	Nothing	Remove visible panty lines | Wedgies - stop them	Any as long as is comfortable	$20 - $50 - Underwear and bras purchased together	No answer	2024-11-21 23:39:25.753852
71	Misha	Nashville, TN	0	Musician	No Answer	Walmart/target	Better coverage. Build in "fupa support"	In-shop	High Waist Briefs | Boy shorts 	Yes I wear shapewear | I do wear waist trainers	If they roll down at the sides or lift at the cheeks	Remove visible panty lines | Sizing is priority | Wedgies - stop them | Fabric choice is a priority | Fit is a priority	Joyspun, kindly yours... They feel great and flex with movement without shifting, great elasticity, soft/ durable fabric	$20 - $50 - Underwear and bras purchased together	No answer	2024-11-21 23:39:25.753852
72	Hiba	Birmingham	0	Employee engagement advisor	Grade E	Marks and Spencer’s and Savage X Fenty	More seamless options	In-shop | undefined	Brazilian  (others)	Rarely wear shapewear 	Sometimes feels suffocating	Remove visible panty lines | Fabric choice is a priority | Quality is important | Ease of removing | Wedgies - stop them	Savage X Fenty - the quality is incomparable and I find that the fit is amazing. No wedgies to be seen!	$20 - $50 - Underwear and bras purchased together	No answer	2024-11-21 23:39:25.753852
73	Shantelle	Birmingham	0	Mobile hairstylist	No Answer	Primark, H&M and Victoria secrets	Take the bow of and make the seemless	In-shop	Briefs | Cheeky (French) | Thong	No I don't wear shapewear and wouldn't 	Going up the crutch	Remove visible panty lines | Quality is important | Fabric choice is a priority | Comfortability around waist | Comfortability on bottom	I’d say Victoria because material is quality and great comfortable fit	$20 - $50 - Underwear and bras purchased together	No answer	2024-11-21 23:39:25.753852
74	Shel	Atlanta	0	No Answer	No Answer	Target, TJ Maxx and Victoria’s Secret	That it would be 100% organic fabrics	In-shop	Thong	No I don't wear shapewear and wouldn't 	The fabric and how it forms to my body	Quality is important | Sizing is priority | Fabric choice is a priority | Comfortability around waist | Comfortability on bottom	Target because the fabric is soft	$10 - $35 for packs of underwear	No	2024-11-21 23:39:25.753852
75	Natasha	Birmingham	0	Risk Management	Senior	Sainsbury's	There longevity how durable	Online	Briefs | High Waist Briefs | Cheeky (French)	Yes I wear shapewear	Sometime the material isn't the best quality so won't last and may feel uncomfortable.	Fit is a priority | Comfortability around waist | Comfortability on bottom | Remove visible panty lines | Sizing is priority | Quality is important	Don't have one but Avon stuff ans Primark is usually good quality and reasonably priced. Also their fit is better due to heavy on top.	$20 - $50 - Underwear and bras purchased together	Depends, I want ro get the most for my money.	2024-11-21 23:39:25.753852
76	Ivelisse Ferrer	Hiram, GA	0	No Answer	Social worker	Victorias secret	Comfort	Online	High Waist Briefs	No I don't, but would try shapewear 	Wedgies	Wedgies - stop them | Comfortability around waist	Victoria’s Secret, the nylon material is very soft comfy and hides panty lines	$20 - $50 - Underwear and bras purchased together	No	2024-11-21 23:39:25.753852
77	Bryanna	New York	0	Concierge	College	Sexy styles	I would like it to be cotton underwear	Online	Boy shorts  | Hipsters | Bikini | Thong	Yes I wear shapewear	Nothing	Wedgies - stop them | Remove visible panty lines	Pink because they are cute and comfortable	$20 - $50 - Underwear and bras purchased together	Yes	2024-11-21 23:39:25.753852
78	Diamond	NY	0	Accountant	No Answer	Victoria’s Secret/Skims	The panty line showing	Online | In-shop	Cheeky (French) | Thong | Briefs | Hipsters	Yes I wear shapewear	The pum pum can’t breathe	Fit is a priority | Remove visible panty lines | Fabric choice is a priority	Skims/most comfortable	$50 - $150 - underwear and bras purchased together	Yes	2024-11-21 23:39:25.753852
79	Jodi	Atlanta	0	Coach	No Answer	Victoria Secret/ Adidas	The way they fit my butt	In-shop	Boy shorts 	No I don't wear shapewear and wouldn't 	Showing plumbers crack	Comfortability on bottom | Comfortability around waist | Wedgies - stop them | Fabric choice is a priority | Quality is important | Sizing is priority	None, havent found the perfect fit	$10 - $35 for packs of underwear	Maybe	2024-11-21 23:39:25.753852
96	Kasandra baker	B18 4hd	0	Unemployed	Health and social  care level 1	Calvin  klien and Victoria secret	Just a good material	In-shop | Online	Boy shorts  | Bikini | Thong | G-String | Briefs	Yes I wear shapewear	It just sitting on you	Comfortability on bottom | Comfortability around waist | Wedgies - stop them | Fabric choice is a priority	Victoria  secret	$35 upwards per bra	Yes	2024-11-21 23:39:25.753852
80	Nivia	New york	0	Medical receptionist	No Answer	Hanes Victoria secret	More coverage	Online	High Waist Briefs | Boy shorts  | Hipsters | Cheeky (French) | Bikini | Briefs	Yes I wear shapewear | I do wear waist trainers	It’s tight not fitted	Ease of removing | Wedgies - stop them | Fit is a priority | Comfortability on bottom | Comfortability around waist | Remove visible panty lines | Fabric choice is a priority | Sizing is priority | Quality is important	Hanes	$20 - $50 - Underwear and bras purchased together	No	2024-11-21 23:39:25.753852
81	Kové	Atlanta	0	Artist/ Entrepreneur	No Answer	Victoria Secret Fenty	The fabric/ Material	In-shop	Boy shorts  | Hipsters | Cheeky (French) | Bikini | Thong	No I don't, but would try shapewear 	Wedgies and non stretch underwear	Wedgies - stop them | Fit is a priority | Comfortability around waist | Comfortability on bottom | Remove visible panty lines | Fabric choice is a priority | Sizing is priority | Quality is important	Victoria secret for the variety	$20 - $50 - Underwear and bras purchased together	Yes as long as it’s comfortable	2024-11-21 23:39:25.753852
82	John	Nyc	0	Entrepreneur	Ceo	Ralph Lauren	I’ll change anything that doesn’t make me feel comfortable while wearing my jeans . Anything to eliminate being uncomfortable	In-shop	Boxers (others)	Wear boxers  (others)	When it rides in the front	Wedgies - stop them	Polo and ethika because the comfort of how it makes me feel	$50 - $150 - underwear and bras purchased together	No	2024-11-21 23:39:25.753852
83	Marva	New Jersey	0	Social worker	No Answer	Full a nylon spandex	Soft full panties above the navel  without too much of a fight to get tummy tuck underwear up	In-shop	High Waist Briefs	I do wear waist trainers	If I want my tummy tuck it has to be tight which makes it a challenge to get it up n down	Ease of removing | Comfortability around waist | Remove visible panty lines | Quality is important | Fabric choice is a priority | Fit is a priority	I hv no preference just need soft flattering underwear	$50 - $150 - underwear and bras purchased together	Maybe	2024-11-21 23:39:25.753852
84	Brianna grant	Florida	0	Asset analyst	Not sure	VS and Calvin Klein	Think the sizing by the crotch area could proportion better based on the size. For VS this tends to be an issue where the size may be a medium but the crotch area is like a small	Online	Cheeky (French) | Bikini	No I don't, but would try shapewear 	No Answer	Fit is a priority | Comfortability on bottom | Fabric choice is a priority	VS	$10 - $35 for packs of underwear	Yes	2024-11-21 23:39:25.753852
85	Tracey	GA	0	Brand Ambassador	No Answer	Target and Victoria Secret	Visible panty line	Online | In-shop	Boy shorts  | Cheeky (French) | Bikini | Thong	Yes I wear shapewear	The wedgey lol	Wedgies - stop them | Remove visible panty lines	Target - comfortable and affordable	$20 - $50 - Underwear and bras purchased together	Yes	2024-11-21 23:39:25.753852
86	Stephon Covington	Atlanta	0	Self employed	No Answer	Ethica, SHEIN, Hanes	Materials used to make them	Online | In-shop	Briefs	No I don't wear shapewear and wouldn't 	Having to adjust them when putting on pants	Wedgies - stop them | Fit is a priority | Comfortability on bottom | Quality is important	Hanes they’re comfortable	$10 - $35 for packs of underwear	No	2024-11-21 23:39:25.753852
87	Kezia	Birmingham	0	No Answer	No Answer	Primark	Better ventilation Incorporating mesh panels or strategic ventilation zones in the design that can  promote better airflow that  prevents  excess moisture buildup.	In-shop	Cheeky (French) | Hipsters | Boy shorts  | Briefs | High Waist Briefs	Regularly wear shapewear 	Non breathable fabric	Fabric choice is a priority	No Answer	$35 upwards per bra	Yes	2024-11-21 23:39:25.753852
88	Jessell	Miami	0	Nurse	RN	Victoria Secret and skims	The comfortability	In-shop | Online	Bikini | Thong | Tanga | Hipsters | Boy shorts  | G-String	I do wear waist trainers	The fit and the way some leaves a print	Wedgies - stop them | Fit is a priority | Ease of removing | Comfortability on bottom | Comfortability around waist | Remove visible panty lines | Fabric choice is a priority | Sizing is priority | Quality is important	V.S because it’s very accessible	$50 - $150 - underwear and bras purchased together	Yes	2024-11-21 23:39:25.753852
89	Joana Teixeira	Birmingham	0	Nurse	No Answer	Due to pricing I've been mostly buying mined from pretty little thing	Have a variety of styles as it seems like there is more lace trim than anything else	Online	Briefs | Cheeky (French) | Thong	No I don't wear shapewear and wouldn't  | Yes I wear shapewear	When the bra cups don't sit well	Wedgies - stop them | Comfortability on bottom | Comfortability around waist | Sizing is priority | Quality is important | Fit is a priority	Don't really have one	$10 - $35 for packs of underwear	Yes	2024-11-21 23:39:25.753852
90	Shalon	Atlanta	0	Singer, songwriter, producer, & painter	No Answer	Victoria secret, SHEIN	Sexy underwear not being comfortable	Online | In-shop	Boy shorts  | Bikini	Yes I wear shapewear | I do wear waist trainers	Wedges and when the hip rolls up when wearing boy shorts	Wedgies - stop them | Comfortability around waist | Remove visible panty lines | Fabric choice is a priority | Quality is important | Ease of removing | Fit is a priority | Comfortability on bottom | Sizing is priority	I don’t have a preference, as long as it’s comfortable	$20 - $50 - Underwear and bras purchased together	Yes	2024-11-21 23:39:25.753852
91	Marie	Birmingham	0	No Answer	No Answer	River island, asos	Wouldn't have in-between sizing	In-shop | Online	High Waist Briefs | Boy shorts 	Rarely wear shapewear 	Nothing	Fit is a priority | Fabric choice is a priority | Sizing is priority | Quality is important | Remove visible panty lines | Comfortability around waist | Comfortability on bottom	River island	$20 - $50 - Underwear and bras purchased together	No	2024-11-21 23:39:25.753852
92	Zoe Etienne	Birmingham	0	No Answer	No Answer	Online, primark, boohoo	The itchy tag inside	Online	Cheeky (French) | Thong	Yes I wear shapewear	Some of the materials	Comfortability on bottom | Comfortability around waist | Fabric choice is a priority | Quality is important	Savage x fenty. The designs and materials	$20 - $50 - Underwear and bras purchased together	Yes	2024-11-21 23:39:25.753852
93	Wonika	Birmingham	0	Yoga instructor	Qualified	Victoria secrets	Nothing	In-shop	High Waist Briefs | Briefs | Normal full knickers   (others)	No  (others)	Restriction or tightness	 N/a  (others)	Victoria secrets fits great last long	$50 - $150 - underwear and bras purchased together	Yes if comfortable	2024-11-21 23:39:25.753852
94	Joanne Paul	Birmingham	0	SAHM	No Answer	Primark, Supermarkets	Having to wear it	In-shop	Cheeky (French)	Rarely wear shapewear 	Restriction	Remove visible panty lines	No Answer	$20 - $50 - Underwear and bras purchased together	Yes	2024-11-21 23:39:25.753852
95	Saffron Worrell	Birmingham	0	No Answer	Assistant	Supermarket brands or m&s	Vpl	In-shop	Briefs | High Waist Briefs | Boy shorts 	Shape wear only after childbirth for a year, then refuse to wear it anymore.  (others)	Tightness	Wedgies - stop them | Fit is a priority | Remove visible panty lines	M&S they fitted my first bra, it's a name that has passed down through generations. The quality has been consistently good	$20 - $50 - Underwear and bras purchased together	Yes	2024-11-21 23:39:25.753852
97	Lorraine	Birmingham uk	0	No Answer	No Answer	George (Asda) Marks and spencer	That it didn't bobble	In-shop	Briefs	No I don't, but would try shapewear 	Bones in bras, knicker lines	Remove visible panty lines | Quality is important | Sizing is priority | Fit is a priority	No particular brand	$20 - $50 - Underwear and bras purchased together	Yes	2024-11-21 23:39:25.753852
98	Zi	Birmingham	0	Youth worker	Nvq	Local stores ( primark)	To be more inclusive of wider butt areas	In-shop	High Waist Briefs | Cheeky (French) | Thong	Rarely wear shapewear 	Underwire bras and knickers that have poor quality	Wedgies - stop them | Fit is a priority | Comfortability on bottom | Comfortability around waist | Fabric choice is a priority | Quality is important	Don’t have one	$20 - $50 - Underwear and bras purchased together	Yes	2024-11-21 23:39:25.753852
99	Angelina McLaughlin	Sutton Colfield	0	School Health Staff Nurse	Band 5	Asda	If things were more comfortable	Online	Thong | High Waist Briefs	Rarely wear shapewear 	Waist band always uncomfortable	Comfortability around waist	Fig leaves because they do larger bra sizes with matching bra and knicker sets.	$20 - $50 - Underwear and bras purchased together	Yes	2024-11-21 23:39:25.753852
100	Yelitza	Sandwell	0	English lecturer	Professional	Primark, Marks and Spencer, Victoria Secret	Balance between, comfortable, sexy and right matrial for ladies i.e. cotton	In-shop | Online	Tanga | Bikini | Thong	No I don't, but would try shapewear 	Not made for round bottoms, so often rides up the bottom.	Wedgies - stop them | Remove visible panty lines | Fabric choice is a priority | Quality is important	Marks and spencer tanga briefs. Which they have now stopped making. Comfortable, sexy and made from cotton.	$10 - $35 for packs of underwear	Yes, if it's comfortable.	2024-11-21 23:39:25.753852
101	Kajeria.S	Atl	0	Influencer	No Answer	Victoria secret	The way they fit  around my butt and crotch	Online | In-shop	Boy shorts  | Thong | Tanga | Bikini	I do wear waist trainers	When it shows under my clothes	Wedgies - stop them | Ease of removing | Fit is a priority | Comfortability on bottom | Comfortability around waist | Remove visible panty lines | Sizing is priority	V.S	$20 - $50 - Underwear and bras purchased together	Yes	2024-11-21 23:39:25.753852
102	Rebbecca	Birmingham	0	Director	No Answer	I don’t have a favourite	Have more cotton knickers readily available	In-shop	Briefs	Rarely wear shapewear 	When it’s too restrictive or unbreathable	Cotton options (others)	N/a	Always under $5 for 3 pairs	Yes	2024-11-21 23:39:25.753852
103	Rehnae	Stoke	0	Administrator	No Answer	Primark thongs and frenchies	The elasticity to fit ur shape and not give you hip dips	In-shop	Thong	Rarely wear shapewear 	The dry material and the tag inside	Ease of removing | Comfortability around waist | Fabric choice is a priority	Primark because there are so many different materials	$20 - $50 - Underwear and bras purchased together	Yes especially when on monthly’s	2024-11-21 23:39:25.753852
104	Brandy	Guild close	0	Behaviour mentor	Senior	Lasenza	More cotton made ones	In-shop	Cheeky (French) | Hipsters | Thong | High Waist Briefs	I do wear waist trainers	Keeps rolling down	Fit is a priority | Comfortability around waist | Fabric choice is a priority | Quality is important	Marks and Spencer’s, La senza, Primark	$20 - $50 - Underwear and bras purchased together	Yes	2024-11-21 23:39:25.753852
105	Richella	Birmingham	0	No Answer	No Answer	Peacocks / Primark / ASOS	More breathable	In-shop	Hipsters | Cheeky (French) | High Waist Briefs	No I don't, but would try shapewear 	If the quality of the material is not good	Wedgies - stop them | Fit is a priority | Comfortability around waist | Fabric choice is a priority | Sizing is priority | Quality is important	No favourite brand, I just get underwear that is comfortable, fits well and has good material	$10 - $35 for packs of underwear	No	2024-11-21 23:39:25.753852
106	Anne	Stafford	0	Ceo	Senior	Dont ware	Comfort	Online	Cheeky (French)	Rarely wear shapewear 	Wedgy	Wedgies - stop them | Fabric choice is a priority | Sizing is priority	Dho	$35 upwards per bra	Yes	2024-11-21 23:39:25.753852
107	Rach	Bham	0	No Answer	No Answer	Bo avenue and MS Anna Summers..Fenty	Under wire	Online | In-shop	Thong | G-String | Cheeky (French) | High Waist Briefs	Rarely wear shapewear 	Some time lace	Remove visible panty lines | Fabric choice is a priority | Sizing is priority | Quality is important	Boux Avenue priorities for curvy women seem to be taken into consideration and look pretty too	$35 upwards per bra	Yes	2024-11-21 23:39:25.753852
108	Michelle Williams	Castle vale	0	No Answer	No Answer	Primark	No underwire bra	In-shop	Cheeky (French)	Rarely wear shapewear 	The elastic around the leg and thongs cutting like a knife for big bottom women	Wedgies - stop them | Comfortability on bottom | Remove visible panty lines	No Answer	$5-$15 per bra	Yes	2024-11-21 23:39:25.753852
109	Tarnia	Birmingham	0	No Answer	No Answer	Boux Avenue. M&S. Primark	Making bra straps more comfortable	In-shop	Boy shorts  | Hipsters | Cheeky (French)	Rarely wear shapewear 	Getting wedgies	Wedgies - stop them | Remove visible panty lines | Quality is important | Fit is a priority | Fabric choice is a priority	Boux Avenue because they always have my size and I like their sets	$20 - $50 - Underwear and bras purchased together	Yes	2024-11-21 23:39:25.753852
110	Candace Nichelson	CT	0	No Answer	Masters	Victoria Secret	The sizes they run smaller	Online	Cheeky (French)	Rarely wear shapewear 	It going up my butt	Wedgies - stop them | Sizing is priority | Fabric choice is a priority | Remove visible panty lines	Victoria Secret, only place I shop for underwear	$20 - $50 - Underwear and bras purchased together	No	2024-11-21 23:39:25.753852
111	Sophie	Birmingham	0	Artist	No Answer	M&S	Price	In-shop	High Waist Briefs	Rarely wear shapewear 	No Answer	Fabric choice is a priority | Remove visible panty lines | Quality is important | Fit is a priority	Contessa fior sizing availability	$15 - $35 per bra	No	2024-11-21 23:39:25.753852
112	Lydia	Wednesbury	0	No Answer	No Answer	Anywhere	Comfort	In-shop	Thong | High Waist Briefs | Hipsters	Rarely wear shapewear 	Items that don’t fit well and move around during wear	Wedgies - stop them | Fit is a priority | Comfortability around waist | Remove visible panty lines | Fabric choice is a priority | Sizing is priority	No Answer	$20 - $50 - Underwear and bras purchased together	Yes	2024-11-21 23:39:25.753852
113	Xon	Brooklyn, NY	0	No Answer	No Answer	Aerie, Victoria Secret, Fenty	Quality/Fabric. Meaning fabric stretch too much, some lace are uncomfortable, etc	Online	Bikini | Cheeky (French) | Thong | Hipsters	No I don't, but would try shapewear 	I’m hesitant about the quality of the fabric and how that will feel on my body all day, esp when it’s hot	Fabric choice is a priority | Quality is important | Fit is a priority | Wedgies - stop them	Gently because I like the cute designs	$20 - $50 - Underwear and bras purchased together	Yes	2024-11-21 23:39:25.753852
114	Francesca	Sawbridgeworth	0	Cabin crew	Junior (New) CC	George and primark	The accessibility and affordability of lingerie for large busts	In-shop	Bikini | Thong | G-String | High Waist Briefs	No I don't, but would try shapewear 	If it chaffes	Wedgies - stop them | Fit is a priority | Comfortability on bottom | Remove visible panty lines	Don’t have one	$20 - $50 - Underwear and bras purchased together	Will try it	2024-11-21 23:39:25.753852
115	Ace	Birmingham	0	Educator, entrepreneur	Owner of Businesses	From primark, m&s, random spots, bravissimo, sometimes online	Better materials that higher frequency	In-shop	Cheeky (French) | Briefs | Thong	Rarely wear shapewear 	No Answer	Comfortability around waist | Fabric choice is a priority | Sizing is priority | Quality is important | Remove visible panty lines | Fit is a priority | Comfortability on bottom	No Answer	$20 - $50 - Underwear and bras purchased together	No Answer	2024-11-21 23:39:25.753852
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: emmamendez
--

COPY public.users (id, name, email, created_at) FROM stdin;
\.


--
-- Name: data_logs_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: emmamendez
--

SELECT pg_catalog.setval('public.data_logs_log_id_seq', 1, true);


--
-- Name: survey_processed_data_id_seq; Type: SEQUENCE SET; Schema: public; Owner: emmamendez
--

SELECT pg_catalog.setval('public.survey_processed_data_id_seq', 1, false);


--
-- Name: survey_raw_data_id_seq; Type: SEQUENCE SET; Schema: public; Owner: emmamendez
--

SELECT pg_catalog.setval('public.survey_raw_data_id_seq', 115, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: emmamendez
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- Name: data_logs data_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: emmamendez
--

ALTER TABLE ONLY public.data_logs
    ADD CONSTRAINT data_logs_pkey PRIMARY KEY (log_id);


--
-- Name: survey_processed_data survey_processed_data_pkey; Type: CONSTRAINT; Schema: public; Owner: emmamendez
--

ALTER TABLE ONLY public.survey_processed_data
    ADD CONSTRAINT survey_processed_data_pkey PRIMARY KEY (id);


--
-- Name: survey_raw_data survey_raw_data_pkey; Type: CONSTRAINT; Schema: public; Owner: emmamendez
--

ALTER TABLE ONLY public.survey_raw_data
    ADD CONSTRAINT survey_raw_data_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: emmamendez
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: emmamendez
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: idx_age; Type: INDEX; Schema: public; Owner: emmamendez
--

CREATE INDEX idx_age ON public.survey_raw_data USING btree (age);


--
-- Name: idx_location; Type: INDEX; Schema: public; Owner: emmamendez
--

CREATE INDEX idx_location ON public.survey_raw_data USING btree (location);


--
-- PostgreSQL database dump complete
--

