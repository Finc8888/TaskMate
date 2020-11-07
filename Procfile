web: gunicorn runp-heroku:app
init: npm -i && npm run start
upgrade: python db_upgrade.py && pybabel compile -d app/translations