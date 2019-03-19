// NPM MODULE
const PublicUserRouter = require('express').Router();

// LOCAL MODULE
const UserServices = require('../services/user_services');
const {isRequiredNeeded} = require('../services/utils');