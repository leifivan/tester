// Generated by RPG Maker.
// Do not edit this file directly.
var $plugins =
[
{"name":"------------------------","status":false,"description":"----------------------------------------------------------------------------------","parameters":{}},
{"name":"Community_Basic","status":true,"description":"Plugin used to set basic parameters.","parameters":{"cacheLimit":"50","screenWidth":"624","screenHeight":"1104","changeWindowWidthTo":"","changeWindowHeightTo":"","renderingMode":"auto","alwaysDash":"off"}},
{"name":"------------------------","status":false,"description":"----------------------------------------------------------------------------------","parameters":{}},
{"name":"GALV_CamControl","status":true,"description":"Allows greater control over where the game camera is focused. View HELP for plugin commands.","parameters":{"Tile Size":"48"}},
{"name":"------------------------","status":false,"description":"----------------------------------------------------------------------------------","parameters":{}},
{"name":"SimpleNameInputMenu","status":true,"description":"This plugin makes a super simple (single page) player name input with an actual on-screen menu backspace button","parameters":{}},
{"name":"------------------------","status":false,"description":"----------------------------------------------------------------------------------","parameters":{}},
{"name":"-ShoraLighting-","status":true,"description":"[v1.8] Provide dynamic lighting to RPG Maker MV/MZ engine, intended to be easiest to start and most flexible when advanced!","parameters":{"version":"MV","sep":"","Game":"{\"regionStart\":\"1\",\"regionEnd\":\"10\",\"topRegionId\":\"50\",\"ignoreShadowsId\":\"51\"}","sep0":"","Map":"{\"ambient\":\"#222222\",\"shadowAmbient\":\"#333333\",\"topBlockAmbient\":\"#030303\"}","sep1":"","default":"{\"name\":\"default\",\"filename\":\"lights\",\"status\":\"true\",\"radius\":\"100\",\"angle\":\"0\",\"direction\":\"false\",\"sep0\":\"\",\"tint\":\"#ffffff\",\"colorfilter\":\"{\\\"hue\\\":\\\"0\\\",\\\"colortone\\\":\\\"rgba(8,243,242,194)\\\",\\\"blendcolor\\\":\\\"rgba(96,151,221,229)\\\",\\\"brightness\\\":\\\"255\\\"}\",\"sep1\":\"\",\"offset\":\"{\\\"x\\\":\\\"0\\\",\\\"y\\\":\\\"0\\\"}\",\"animation\":\"{\\\".Static\\\":\\\"\\\",\\\"flicker\\\":\\\"{\\\\\\\"status\\\\\\\":\\\\\\\"true\\\\\\\",\\\\\\\"flickintensity\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"flickspeed\\\\\\\":\\\\\\\"1\\\\\\\"}\\\",\\\".Dynamic\\\":\\\"\\\",\\\"pulse\\\":\\\"{\\\\\\\"status\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"pulsefactor\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"pulsespeed\\\\\\\":\\\\\\\"1\\\\\\\"}\\\",\\\"rotation\\\":\\\"{\\\\\\\"rotatespeed\\\\\\\":\\\\\\\"1\\\\\\\"}\\\"}\",\"sep4\":\"\",\"shadow\":\"true\",\"bwall\":\"false\",\"shadowambient\":\"\",\"shadowoffsetx\":\"0\",\"shadowoffsety\":\"-18\"}","LightList":"[\"{\\\"name\\\":\\\"flashlight\\\",\\\"filename\\\":\\\"flashlight\\\",\\\"status\\\":\\\"true\\\",\\\"sep0\\\":\\\"\\\",\\\"tint\\\":\\\"#ffffff\\\",\\\"colorfilter\\\":\\\"{\\\\\\\"hue\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"colortone\\\\\\\":\\\\\\\"rgba(0,0,0,0)\\\\\\\",\\\\\\\"blendcolor\\\\\\\":\\\\\\\"rgba(0,0,0,0)\\\\\\\",\\\\\\\"brightness\\\\\\\":\\\\\\\"255\\\\\\\"}\\\",\\\"sep1\\\":\\\"\\\",\\\"offset\\\":\\\"{\\\\\\\"x\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"animation\\\":\\\"{\\\\\\\".Static\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"flicker\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"status\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"true\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"flickintensity\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"flickspeed\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\".Dynamic\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"pulse\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"status\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"pulsefactor\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"pulsespeed\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"rotation\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"rotatespeed\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"}\\\\\\\"}\\\",\\\"direction\\\":\\\"true\\\",\\\"sep4\\\":\\\"\\\",\\\"shadow\\\":\\\"true\\\",\\\"static\\\":\\\"auto\\\",\\\"bwall\\\":\\\"false\\\",\\\"shadowambient\\\":\\\"#000000\\\",\\\"shadowoffsetx\\\":\\\"0\\\",\\\"shadowoffsety\\\":\\\"0\\\"}\",\"{\\\"name\\\":\\\"flashlight_nodir\\\",\\\"filename\\\":\\\"flashlight\\\",\\\"status\\\":\\\"true\\\",\\\"radius\\\":\\\"100\\\",\\\"angle\\\":\\\"0\\\",\\\"direction\\\":\\\"false\\\",\\\"sep0\\\":\\\"\\\",\\\"tint\\\":\\\"#ffffff\\\",\\\"colorfilter\\\":\\\"{\\\\\\\"hue\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"colortone\\\\\\\":\\\\\\\"rgba(0,0,0,0)\\\\\\\",\\\\\\\"blendcolor\\\\\\\":\\\\\\\"rgba(0,0,0,0)\\\\\\\",\\\\\\\"brightness\\\\\\\":\\\\\\\"255\\\\\\\"}\\\",\\\"sep1\\\":\\\"\\\",\\\"offset\\\":\\\"{\\\\\\\"x\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"animation\\\":\\\"{\\\\\\\".Static\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"flicker\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"status\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"true\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"flickintensity\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"flickspeed\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\".Dynamic\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"pulse\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"status\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"pulsefactor\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"pulsespeed\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"rotation\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"rotatespeed\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"}\\\\\\\"}\\\",\\\"sep4\\\":\\\"\\\",\\\"shadow\\\":\\\"true\\\",\\\"bwall\\\":\\\"false\\\",\\\"shadowambient\\\":\\\"#000000\\\",\\\"shadowoffsetx\\\":\\\"0\\\",\\\"shadowoffsety\\\":\\\"0\\\"}\",\"{\\\"name\\\":\\\"street\\\",\\\"filename\\\":\\\"lights\\\",\\\"sep0\\\":\\\"\\\",\\\"tint\\\":\\\"#ffffff\\\",\\\"colorfilter\\\":\\\"{\\\\\\\"hue\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"colortone\\\\\\\":\\\\\\\"rgba(8,243,242,194)\\\\\\\",\\\\\\\"blendcolor\\\\\\\":\\\\\\\"rgba(96,151,221,229)\\\\\\\",\\\\\\\"brightness\\\\\\\":\\\\\\\"255\\\\\\\"}\\\",\\\"sep1\\\":\\\"\\\",\\\"offset\\\":\\\"{\\\\\\\"x\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"animation\\\":\\\"{\\\\\\\".Static\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"flicker\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"status\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"true\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"flickintensity\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"flickspeed\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\".Dynamic\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"pulse\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"status\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"pulsefactor\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"pulsespeed\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"rotation\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"rotatespeed\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"}\\\\\\\"}\\\",\\\"direction\\\":\\\"false\\\",\\\"sep4\\\":\\\"\\\",\\\"shadow\\\":\\\"true\\\",\\\"static\\\":\\\"true\\\",\\\"bwall\\\":\\\"false\\\",\\\"shadowambient\\\":\\\"\\\"}\",\"{\\\"name\\\":\\\"fire\\\",\\\"filename\\\":\\\"lights\\\",\\\"sep0\\\":\\\"\\\",\\\"tint\\\":\\\"#ffffff\\\",\\\"colorfilter\\\":\\\"{\\\\\\\"hue\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"colortone\\\\\\\":\\\\\\\"rgba(8,243,242,194)\\\\\\\",\\\\\\\"blendcolor\\\\\\\":\\\\\\\"rgba(96,151,221,229)\\\\\\\",\\\\\\\"brightness\\\\\\\":\\\\\\\"255\\\\\\\"}\\\",\\\"sep1\\\":\\\"\\\",\\\"offset\\\":\\\"{\\\\\\\"x\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"animation\\\":\\\"{\\\\\\\".Static\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"flicker\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"status\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"true\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"flickintensity\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"flickspeed\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\".Dynamic\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"pulse\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"status\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"pulsefactor\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"pulsespeed\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"rotation\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"rotatespeed\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"}\\\\\\\"}\\\",\\\"direction\\\":\\\"false\\\",\\\"sep4\\\":\\\"\\\",\\\"shadow\\\":\\\"true\\\",\\\"static\\\":\\\"auto\\\",\\\"bwall\\\":\\\"false\\\",\\\"shadowambient\\\":\\\"\\\"}\",\"{\\\"name\\\":\\\"no\\\",\\\"filename\\\":\\\"lights\\\",\\\"sep0\\\":\\\"\\\",\\\"tint\\\":\\\"#ffffff\\\",\\\"colorfilter\\\":\\\"{\\\\\\\"hue\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"colortone\\\\\\\":\\\\\\\"rgba(0,0,0,0)\\\\\\\",\\\\\\\"blendcolor\\\\\\\":\\\\\\\"rgba(0,0,0,0)\\\\\\\",\\\\\\\"brightness\\\\\\\":\\\\\\\"255\\\\\\\"}\\\",\\\"sep1\\\":\\\"\\\",\\\"offset\\\":\\\"{\\\\\\\"x\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"animation\\\":\\\"{\\\\\\\".Static\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"flicker\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"status\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"true\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"flickintensity\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"flickspeed\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\".Dynamic\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"pulse\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"status\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"pulsefactor\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"pulsespeed\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"rotation\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"rotatespeed\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"}\\\\\\\"}\\\",\\\"direction\\\":\\\"false\\\",\\\"sep4\\\":\\\"\\\",\\\"shadow\\\":\\\"false\\\",\\\"static\\\":\\\"auto\\\",\\\"bwall\\\":\\\"false\\\",\\\"shadowambient\\\":\\\"\\\"}\",\"{\\\"name\\\":\\\"under\\\",\\\"filename\\\":\\\"under\\\",\\\"status\\\":\\\"true\\\",\\\"sep0\\\":\\\"\\\",\\\"tint\\\":\\\"#ffffff\\\",\\\"colorfilter\\\":\\\"{\\\\\\\"hue\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"colortone\\\\\\\":\\\\\\\"rgba(8,243,242,194)\\\\\\\",\\\\\\\"blendcolor\\\\\\\":\\\\\\\"rgba(96,151,221,229)\\\\\\\",\\\\\\\"brightness\\\\\\\":\\\\\\\"255\\\\\\\"}\\\",\\\"sep1\\\":\\\"\\\",\\\"offset\\\":\\\"{\\\\\\\"x\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"animation\\\":\\\"{\\\\\\\".Static\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"flicker\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"status\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"true\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"flickintensity\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"flickspeed\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\".Dynamic\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"pulse\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"status\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"pulsefactor\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"pulsespeed\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"rotation\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"rotatespeed\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"}\\\\\\\"}\\\",\\\"direction\\\":\\\"false\\\",\\\"sep4\\\":\\\"\\\",\\\"shadow\\\":\\\"true\\\",\\\"static\\\":\\\"true\\\",\\\"bwall\\\":\\\"false\\\",\\\"shadowambient\\\":\\\"\\\",\\\"shadowoffsetx\\\":\\\"0\\\",\\\"shadowoffsety\\\":\\\"0\\\"}\",\"{\\\"name\\\":\\\"pink\\\",\\\"filename\\\":\\\"lights\\\",\\\"sep0\\\":\\\"\\\",\\\"tint\\\":\\\"#fc03c2\\\",\\\"colorfilter\\\":\\\"{\\\\\\\"hue\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"colortone\\\\\\\":\\\\\\\"rgba(0,0,0,0)\\\\\\\",\\\\\\\"blendcolor\\\\\\\":\\\\\\\"rgba(0,0,0,0)\\\\\\\",\\\\\\\"brightness\\\\\\\":\\\\\\\"255\\\\\\\"}\\\",\\\"sep1\\\":\\\"\\\",\\\"offset\\\":\\\"{\\\\\\\"x\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"animation\\\":\\\"{\\\\\\\".Static\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"flicker\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"status\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"true\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"flickintensity\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"flickspeed\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\".Dynamic\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"pulse\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"status\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"pulsefactor\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"pulsespeed\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"rotation\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"rotatespeed\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"}\\\\\\\"}\\\",\\\"direction\\\":\\\"false\\\",\\\"sep4\\\":\\\"\\\",\\\"shadow\\\":\\\"true\\\",\\\"static\\\":\\\"auto\\\",\\\"bwall\\\":\\\"false\\\",\\\"shadowambient\\\":\\\"\\\"}\",\"{\\\"name\\\":\\\"needle\\\",\\\"filename\\\":\\\"lights\\\",\\\"sep0\\\":\\\"\\\",\\\"tint\\\":\\\"#ffffff\\\",\\\"colorfilter\\\":\\\"{\\\\\\\"hue\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"colortone\\\\\\\":\\\\\\\"rgba(0,0,0,0)\\\\\\\",\\\\\\\"blendcolor\\\\\\\":\\\\\\\"rgba(0,0,0,0)\\\\\\\",\\\\\\\"brightness\\\\\\\":\\\\\\\"255\\\\\\\"}\\\",\\\"sep1\\\":\\\"\\\",\\\"offset\\\":\\\"{\\\\\\\"x\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"animation\\\":\\\"{\\\\\\\".Static\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"flicker\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"status\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"true\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"flickintensity\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"flickspeed\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\".Dynamic\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"pulse\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"status\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"pulsefactor\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"pulsespeed\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"rotation\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"rotatespeed\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"}\\\\\\\"}\\\",\\\"direction\\\":\\\"false\\\",\\\"sep4\\\":\\\"\\\",\\\"shadow\\\":\\\"true\\\",\\\"static\\\":\\\"auto\\\",\\\"bwall\\\":\\\"false\\\",\\\"shadowambient\\\":\\\"\\\"}\",\"{\\\"name\\\":\\\"latern\\\",\\\"filename\\\":\\\"lights\\\",\\\"sep0\\\":\\\"\\\",\\\"tint\\\":\\\"#ffffff\\\",\\\"colorfilter\\\":\\\"{\\\\\\\"hue\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"colortone\\\\\\\":\\\\\\\"rgba(0,0,0,0)\\\\\\\",\\\\\\\"blendcolor\\\\\\\":\\\\\\\"rgba(0,0,0,0)\\\\\\\",\\\\\\\"brightness\\\\\\\":\\\\\\\"255\\\\\\\"}\\\",\\\"sep1\\\":\\\"\\\",\\\"offset\\\":\\\"{\\\\\\\"x\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"animation\\\":\\\"{\\\\\\\".Static\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"flicker\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"status\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"true\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"flickintensity\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"flickspeed\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\".Dynamic\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"pulse\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"status\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"pulsefactor\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"pulsespeed\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"rotation\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"rotatespeed\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"}\\\\\\\"}\\\",\\\"direction\\\":\\\"false\\\",\\\"sep4\\\":\\\"\\\",\\\"shadow\\\":\\\"true\\\",\\\"static\\\":\\\"auto\\\",\\\"bwall\\\":\\\"false\\\",\\\"shadowambient\\\":\\\"\\\"}\",\"{\\\"name\\\":\\\"broken\\\",\\\"filename\\\":\\\"under\\\",\\\"sep0\\\":\\\"\\\",\\\"tint\\\":\\\"#ffffff\\\",\\\"colorfilter\\\":\\\"{\\\\\\\"hue\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"colortone\\\\\\\":\\\\\\\"rgba(0,0,0,0)\\\\\\\",\\\\\\\"blendcolor\\\\\\\":\\\\\\\"rgba(0,0,0,0)\\\\\\\",\\\\\\\"brightness\\\\\\\":\\\\\\\"255\\\\\\\"}\\\",\\\"sep1\\\":\\\"\\\",\\\"offset\\\":\\\"{\\\\\\\"x\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"animation\\\":\\\"{\\\\\\\".Static\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"flicker\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"status\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"true\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"flickintensity\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"6\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"flickspeed\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\".Dynamic\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"pulse\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"status\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"pulsefactor\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"pulsespeed\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"rotation\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"rotatespeed\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"}\\\\\\\"}\\\",\\\"direction\\\":\\\"false\\\",\\\"sep4\\\":\\\"\\\",\\\"shadow\\\":\\\"true\\\",\\\"static\\\":\\\"auto\\\",\\\"bwall\\\":\\\"false\\\",\\\"shadowambient\\\":\\\"\\\"}\",\"{\\\"name\\\":\\\"moving\\\",\\\"filename\\\":\\\"under\\\",\\\"sep0\\\":\\\"\\\",\\\"tint\\\":\\\"#ffffff\\\",\\\"colorfilter\\\":\\\"{\\\\\\\"hue\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"colortone\\\\\\\":\\\\\\\"rgba(8,243,242,194)\\\\\\\",\\\\\\\"blendcolor\\\\\\\":\\\\\\\"rgba(96,151,221,229)\\\\\\\",\\\\\\\"brightness\\\\\\\":\\\\\\\"255\\\\\\\"}\\\",\\\"sep1\\\":\\\"\\\",\\\"offset\\\":\\\"{\\\\\\\"x\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"animation\\\":\\\"{\\\\\\\".Static\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"flicker\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"status\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"true\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"flickintensity\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"flickspeed\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\".Dynamic\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"pulse\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"status\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"pulsefactor\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"pulsespeed\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"rotation\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"rotatespeed\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"}\\\\\\\"}\\\",\\\"direction\\\":\\\"false\\\",\\\"sep4\\\":\\\"\\\",\\\"shadow\\\":\\\"true\\\",\\\"static\\\":\\\"auto\\\",\\\"bwall\\\":\\\"false\\\",\\\"shadowambient\\\":\\\"\\\"}\",\"{\\\"name\\\":\\\"static\\\",\\\"filename\\\":\\\"lights\\\",\\\"sep0\\\":\\\"\\\",\\\"tint\\\":\\\"#ffffff\\\",\\\"colorfilter\\\":\\\"{\\\\\\\"hue\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"colortone\\\\\\\":\\\\\\\"rgba(8,243,242,194)\\\\\\\",\\\\\\\"blendcolor\\\\\\\":\\\\\\\"rgba(96,151,221,229)\\\\\\\",\\\\\\\"brightness\\\\\\\":\\\\\\\"255\\\\\\\"}\\\",\\\"sep1\\\":\\\"\\\",\\\"offset\\\":\\\"{\\\\\\\"x\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"animation\\\":\\\"{\\\\\\\".Static\\\\\\\":\\\\\\\"=====================\\\\\\\",\\\\\\\"flicker\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"status\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"true\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"flickintensity\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"flickspeed\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\".Dynamic\\\\\\\":\\\\\\\"=====================\\\\\\\",\\\\\\\"pulse\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"status\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"pulsefactor\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"pulsespeed\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"rotation\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"rotatespeed\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"}\\\\\\\"}\\\",\\\"direction\\\":\\\"false\\\",\\\"sep4\\\":\\\"\\\",\\\"shadow\\\":\\\"true\\\",\\\"static\\\":\\\"true\\\",\\\"bwall\\\":\\\"false\\\",\\\"shadowambient\\\":\\\"\\\"}\",\"{\\\"name\\\":\\\"shadow_offset\\\",\\\"filename\\\":\\\"lights\\\",\\\"sep0\\\":\\\"\\\",\\\"tint\\\":\\\"#ffffff\\\",\\\"colorfilter\\\":\\\"{\\\\\\\"hue\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"colortone\\\\\\\":\\\\\\\"rgba(0,0,0,0)\\\\\\\",\\\\\\\"blendcolor\\\\\\\":\\\\\\\"rgba(0,0,0,0)\\\\\\\",\\\\\\\"brightness\\\\\\\":\\\\\\\"255\\\\\\\"}\\\",\\\"sep1\\\":\\\"\\\",\\\"offset\\\":\\\"{\\\\\\\"x\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"animation\\\":\\\"{\\\\\\\".Static\\\\\\\":\\\\\\\"=====================\\\\\\\",\\\\\\\"flicker\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"status\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"true\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"flickintensity\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"flickspeed\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\".Dynamic\\\\\\\":\\\\\\\"=====================\\\\\\\",\\\\\\\"pulse\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"status\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"pulsefactor\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"pulsespeed\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"rotation\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"rotatespeed\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"}\\\\\\\"}\\\",\\\"direction\\\":\\\"false\\\",\\\"sep4\\\":\\\"\\\",\\\"shadow\\\":\\\"true\\\",\\\"static\\\":\\\"auto\\\",\\\"bwall\\\":\\\"false\\\",\\\"shadowambient\\\":\\\"\\\",\\\"shadowoffsetx\\\":\\\"0\\\",\\\"shadowoffsety\\\":\\\"45\\\"}\",\"{\\\"name\\\":\\\"big\\\",\\\"filename\\\":\\\"under\\\",\\\"sep0\\\":\\\"\\\",\\\"tint\\\":\\\"#ffffff\\\",\\\"colorfilter\\\":\\\"{\\\\\\\"hue\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"colortone\\\\\\\":\\\\\\\"rgba(0,0,0,0)\\\\\\\",\\\\\\\"blendcolor\\\\\\\":\\\\\\\"rgba(0,0,0,0)\\\\\\\",\\\\\\\"brightness\\\\\\\":\\\\\\\"255\\\\\\\"}\\\",\\\"sep1\\\":\\\"\\\",\\\"offset\\\":\\\"{\\\\\\\"x\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"animation\\\":\\\"{\\\\\\\".Static\\\\\\\":\\\\\\\"=====================\\\\\\\",\\\\\\\"flicker\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"status\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"true\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"flickintensity\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"flickspeed\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\".Dynamic\\\\\\\":\\\\\\\"=====================\\\\\\\",\\\\\\\"pulse\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"status\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"pulsefactor\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"pulsespeed\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"rotation\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"rotatespeed\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"}\\\\\\\"}\\\",\\\"direction\\\":\\\"false\\\",\\\"sep4\\\":\\\"\\\",\\\"shadow\\\":\\\"true\\\",\\\"static\\\":\\\"auto\\\",\\\"bwall\\\":\\\"false\\\",\\\"shadowambient\\\":\\\"\\\",\\\"shadowoffsetx\\\":\\\"0\\\",\\\"shadowoffsety\\\":\\\"0\\\"}\",\"{\\\"name\\\":\\\"pulsating\\\",\\\"filename\\\":\\\"lights\\\",\\\"status\\\":\\\"true\\\",\\\"sep0\\\":\\\"\\\",\\\"tint\\\":\\\"#ffffff\\\",\\\"colorfilter\\\":\\\"{\\\\\\\"hue\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"colortone\\\\\\\":\\\\\\\"rgba(0,0,0,0)\\\\\\\",\\\\\\\"blendcolor\\\\\\\":\\\\\\\"rgba(0,0,0,0)\\\\\\\",\\\\\\\"brightness\\\\\\\":\\\\\\\"255\\\\\\\"}\\\",\\\"sep1\\\":\\\"\\\",\\\"offset\\\":\\\"{\\\\\\\"x\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"animation\\\":\\\"{\\\\\\\".Static\\\\\\\":\\\\\\\"=====================\\\\\\\",\\\\\\\"flicker\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"status\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"true\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"flickintensity\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"flickspeed\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\".Dynamic\\\\\\\":\\\\\\\"=====================\\\\\\\",\\\\\\\"pulse\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"status\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"pulsefactor\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"pulsespeed\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"rotation\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"rotatespeed\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"}\\\\\\\"}\\\",\\\"direction\\\":\\\"false\\\",\\\"sep4\\\":\\\"\\\",\\\"shadow\\\":\\\"true\\\",\\\"static\\\":\\\"auto\\\",\\\"bwall\\\":\\\"false\\\",\\\"shadowambient\\\":\\\"\\\",\\\"shadowoffsetx\\\":\\\"0\\\",\\\"shadowoffsety\\\":\\\"0\\\"}\"]","sep2":"","helper":"{\"colors\":\"[\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"white\\\\\\\",\\\\\\\"color\\\\\\\":\\\\\\\"#ffffff\\\\\\\"}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"black\\\\\\\",\\\\\\\"color\\\\\\\":\\\\\\\"#000000\\\\\\\"}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"red\\\\\\\",\\\\\\\"color\\\\\\\":\\\\\\\"#ff000000\\\\\\\"}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"green\\\\\\\",\\\\\\\"color\\\\\\\":\\\\\\\"#00ff00\\\\\\\"}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"blue\\\\\\\",\\\\\\\"color\\\\\\\":\\\\\\\"#0000ff\\\\\\\"}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"orange\\\\\\\",\\\\\\\"color\\\\\\\":\\\\\\\"#ffa500\\\\\\\"}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"cyan\\\\\\\",\\\\\\\"color\\\\\\\":\\\\\\\"#00ffff\\\\\\\"}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"pink\\\\\\\",\\\\\\\"color\\\\\\\":\\\\\\\"#ffc0cb\\\\\\\"}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"afternoon\\\\\\\",\\\\\\\"color\\\\\\\":\\\\\\\"#a35a00\\\\\\\"}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"evening\\\\\\\",\\\\\\\"color\\\\\\\":\\\\\\\"#170069\\\\\\\"}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"night\\\\\\\",\\\\\\\"color\\\\\\\":\\\\\\\"#121212\\\\\\\"}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"dawn\\\\\\\",\\\\\\\"color\\\\\\\":\\\\\\\"#9184bf\\\\\\\"}\\\"]\",\"disableEngineShadow\":\"true\"}","sep3":"","filter":"{\"il\":\"\",\"status\":\"true\",\"brightness\":\"1.4\",\"sep\":\"\",\"ss\":\"\",\"softShadow\":\"true\",\"softShadowStr\":\"1\",\"softShadowQlt\":\"2\"}"}},
{"name":"------------------------","status":false,"description":"----------------------------------------------------------------------------------","parameters":{}},
{"name":"MOG_AnimatedText","status":true,"description":"(v1.3) Apresenta multiplos textos animados.","parameters":{"Letter Space X-Axis":"0","Letter Space Y-Axis":"0"}},
{"name":"MOG_PictureEffectsMZ","status":true,"description":"(v1.0) O plugin permite animar as imagens.","parameters":{}},
{"name":"------------------------","status":false,"description":"----------------------------------------------------------------------------------","parameters":{}}
];
