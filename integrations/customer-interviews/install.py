from pathlib import Path
import shutil
root=Path('/Users/emmamendez/Documents/Source/KLPS-Core')
source=Path('/Users/emmamendez/Documents/Source/Website-UX-UI/integrations/customer-interviews')
shutil.copyfile(source/'routes.ts',root/'server/src/routes/customer-interviews.routes.ts')
shutil.copyfile(source/'migration.sql',root/'server/sql/20261103_customer_interviews.sql')
shutil.copyfile(source/'british-english.ts',root/'server/src/services/customer-british-english.ts')
shutil.copyfile(source/'transcription.service.ts',root/'server/src/services/customer-transcription.service.ts')
shutil.copyfile(source/'transcription.routes.ts',root/'server/src/routes/customer-transcription.routes.ts')
shutil.copyfile(source/'transcripts.sql',root/'server/sql/20261105_customer_transcripts.sql')
p=root/'server/src/index.ts'
s=p.read_text()
line='import customerInterviewsRoutes from "./routes/customer-interviews.routes";\n'
if line not in s:s=line+s
mount='app.use("/api/research/interviews", customerInterviewsRoutes);\n'
if mount not in s:s=s.replace('app.use("/api/research", researchRoutes);',mount+'app.use("/api/research", researchRoutes);')
p.write_text(s)

s=p.read_text()
line='import customerTranscriptionRoutes from "./routes/customer-transcription.routes";\n'
if line not in s:s=line+s
mount='app.use("/api/research/interviews", customerTranscriptionRoutes);\n'
if mount not in s:s=s.replace('app.use("/api/research/interviews", customerInterviewsRoutes);',mount+'app.use("/api/research/interviews", customerInterviewsRoutes);')
p.write_text(s)
