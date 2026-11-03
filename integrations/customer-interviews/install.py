from pathlib import Path
import shutil
root=Path('/Users/emmamendez/Documents/Source/KLPS-Core')
source=Path('/Users/emmamendez/Documents/Source/Website-UX-UI/integrations/customer-interviews')
shutil.copyfile(source/'routes.ts',root/'server/src/routes/customer-interviews.routes.ts')
shutil.copyfile(source/'migration.sql',root/'server/sql/20261103_customer_interviews.sql')
p=root/'server/src/index.ts'
s=p.read_text()
line='import customerInterviewsRoutes from "./routes/customer-interviews.routes";\n'
if line not in s:s=line+s
mount='app.use("/api/research/interviews", customerInterviewsRoutes);\n'
if mount not in s:s=s.replace('app.use("/api/research", researchRoutes);',mount+'app.use("/api/research", researchRoutes);')
p.write_text(s)
