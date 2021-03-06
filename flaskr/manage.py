#!/usr/bin/env python
import os
# import app
from app import create_app,db
from .api1_0 import api
# from flask.ext.script import Manager,Shell
# from flask.ext.migrate import Migrate,MigrateCommand

app=create_app(os.getenv('FLASK_CONFIG') or 'default')
manager=Manager(app)

def make_shell_context():
	return dict(app=app,db=db)

manager.add_commend('shell',Shell(make_context=make_shell_context))
manager.add_commend('db',MigrateCommand)

if(__name__=='__main__'):
	manager.run()