<?php if (!defined('BASEPATH')) exit('No direct script access allowed');
/*
 * LimeSurvey
 * Copyright (C) 2007-2019 The LimeSurvey Project Team / Carsten Schmitz
 * All rights reserved.
 * License: GNU/GPL License v3 or later, see LICENSE.php
 * LimeSurvey is free software. This version may have been modified pursuant
 * to the GNU General Public License, and as distributed it includes or
 * is derivative of works licensed under the GNU General Public License or
 * other free or open source software licenses.
 * See COPYRIGHT.php for copyright notices and details.
 */

/* 
WARNING!!!
ONCE SET, ENCRYPTION KEYS SHOULD NEVER BE CHANGED, OTHERWISE ALL ENCRYPTED DATA COULD BE LOST !!!

*/

$config = array();
$config['encryptionnonce'] = '7f73369041994c7dce46e7cfa67d5f43c42aa1f87212b463';
$config['encryptionsecretboxkey'] = 'afbff503be29e7b087dc37ee287ccbf64f6459b1c429d010db09b9bdc1c0b360';
return $config;