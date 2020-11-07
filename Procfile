web: waitress-serve --port=8000 --call 'main:index'
init: npm -i && npm run start
upgrade: python db_upgrade.py && pybabel compile -d app/translations