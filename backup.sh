#!/bin/bash

DATE=$(date +"%Y-%m-%d_%H-%M")

pg_dump \
  -U klps_app \
  -d klps_db \
  -h localhost \
  -p 5432 \
  > backups/klps_db_$DATE.sql

echo "Backup completed: backups/klps_db_$DATE.sql"
