const express = require('express');
const {jwt_auth} = require('../middleware/index');
const {jwt_decode} = require('../config/jwt');
const {applyLeave, getLeaves} = require('../controller/leaveCtrl');

