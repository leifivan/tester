/*
 * Copyright (c) 2023 Vladimir Skrypnikov (Pheonix KageDesu)
 * <http://kdworkshop.net/>
 *

* License: Creative Commons 4.0 Attribution, Share Alike, Commercial

 */

/*:
 * @plugindesc (v.0.9)[PRO] Mobile Phone Menu
 * @author Pheonix KageDesu
 * @target MZ MV
 * @url http://kdworkshop.net/plugins/phone-menu
 *
 * @help
 * ---------------------------------------------------------------------------
 * 
 * ===========================================================================
 * This plugin add mobile phone (smartphone) menu with alternative
 * messaging system.
 * You can add menu items (phone apps) in phone menu via Plugin Parameters
 *
 * Plugin have resources: img\pPhoneMenu, you can edit them for your purposes
 *
 * ---------------------------------------------------------------------------
 * Script calls:
 * 
 * - Phone.Show(); - Open (show) phone menu
 * - Phone.Hide(); - Hide (close) phone menu
 * - Phone.Disable(); - Disable phone menu (can't be opened)
 * - Phone.Enable(); - Enable phone menu
 *
 * - Phone.AddApp("ID"); - Add APP to Phone Menu (by ID from Plugin Parameters)
 * - Phone.RemoveApp("ID"); - Remove APP from Phone Menu
 *
 * Example: Phone.AddApp("saveApp");
 * Example: Phone.RemoveApp("loadApp");
 *
 * - Phone.ChangePhone("NAME"); - Change phone image to NAME.png
 *              image should be in img\pPhoneMenu folder
 *
 * - Phone.ChangeWallpaper("NAME"); - Change phone wallpaper image
 *
 * - Phone.ChangeMessageWallpaper("NAME"); - Change Messages App background image
 * - Phone.ChangeGalleryWallpaper("NAME"); - Change Gallery App background image
 *
 * Script calls relative Phone Icon on map:
 *
 * - PhoneIcon.Show();
 * - PhoneIcon.Hide();
 * - PhoneIcon.Enable();
 * - PhoneIcon.Disable();
 *
 *
 * Script call for show Notify:
 *
 * Phone.Notify({image: "NAME", text: "TEXT", textPos: [X, Y], se: "FILENAME" });
 *
 * !Image should be from folder \img\pPhoneMenu\
 *
 * Examples:
        Phone.Notify({image: "Notify_NewMessage"});
        Phone.Notify({image: "Notify_NewMessage", text: "Hello!"});
        Phone.Notify({image: "Notify_NewMessage", text: "Hello!", textPos: [10, 20]});
        Phone.Notify({image: "Notify_NewMessage", text: "Hello!", textPos: [10, 20], se: "Attack1" });
 *
 * 
 * Script calls for show Modal Menu:
 *
 * Phone.ShowModalMessage("TITLE TEXT", "BUTTON TITLE"); - Show simple modal message
 * Phone.ShowModalQuestion("TITLE TEXT", "BUTTON 1 TITLE", BUTTON_1_ACTION, "BUTTON 2 TITLE", BUTTON_2_ACTION);
 *     Show simple modal choice with 2 buttons
 *     Where: BUTTON_ACTION can be common event ID or script call (in quotes)
 *
 * Phone.ShowModalMenu("TITLE TEXT", ID, FromMap?); - Show modal menu from event body choices
 *           Where: FromMap - optional, if TRUE, choices body will be loaded from Event (ID)
              on Messages Map instead of Common Event ID
              (set Map ID in Plugin Parameter Messages Map first)
 *
 * Examples:
       Phone.ShowModalMessage("Autosave done!", "OK");
       Phone.ShowModalQuestion("Load autosave?", "Yes", 1, "No", "console.log('canceled')");
       Phone.ShowModalMenu("Select wallpaper", 4, false);
 *
 * ---------------------------------------------------------------------------
 * Messages system:
 *
 * For add new message use script call:
 *
 * - Phone.AddMessage("A", "N", ID, FromMap);
 *      Add new message, A - avatar image name, N - from who (name),
 *          ID - common event Id for conversation content
 *                              (with event message commands)
 *     FromMap - optional, if TRUE, message body will be loaded from Event (ID)
              on Messages Map instead of Common Event ID
              (set Map ID in Plugin Parameter Messages Map first)
 *
 * Example: Phone.AddMessage("avaActor1", "John", 22); // From Common Event ID 22
 * Example: Phone.AddMessage("avaActor2", "Alice", 4, true); // From Messages Map, event 4
 *
 * Common Event should contains messages (and or choices)
 *  (only 2 choices variants supported)
 *
 * Common Event inside converstaion also support next event commands:
 *  - Common Event
 *  - Control Variable
 *  - Control Switches
 *  - Plugin Command (MV only)
 *
 * - Phone.IsHaveNewMessages(); - return true if you have any unread message
 *
 *
 * For default Message App (with ID "messagesApp") parameter Alert Switch is
 * turning ON automatically when you call Phone.AddMessage script call
 *
 * ---------------------------------------------------------------------------
 * ! Examples you can find in plugin Demo project!
 * ---------------------------------------------------------------------------
 * If you like my Plugins, want more and offten updates,
 * please support me on Boosty or Patreon!
 * 
 * Boosty Page:
 *      https://boosty.to/kagedesu
 * Patreon Page:
 *      https://www.patreon.com/KageDesu
 * YouTube Channel:
 *      https://www.youtube.com/channel/UCA3R61ojF5vp5tGwJ1YqdgQ?
 *
 * You can use this plugin in your game thanks to all who supports me!
 * 

* License: Creative Commons 4.0 Attribution, Share Alike, Commercial

 *
 * 
 * @param PKD_PhoneMenu
 * 
 * @param phoneSettings:j
 * @parent PKD_PhoneMenu
 * @type note
 * @text Phone Settings
 * @desc Settings, in [param name]:[value] format. You can change values after :
 * @default "\"openPhoneKey\": \"p\"\n\"screenSize\": { \"w\": 278, \"h\": 434 }\n\"screenOffset\": { \"x\": 16, \"y\": 86 }\n\"phonePosition\": { \"x\": \"Graphics.width / 2 - 155\", \"y\": \"20\" }\n\"appsGrid\": { \"x\": 3, \"y\": 4 }\n\"isAnimate\": true\n\"animationSpeed\": 24\n\"appBackgroundColor\": \"#FFF\"\n\"image\": \"PhoneFace\"\n\"wallpaper\": \"Wallpaper1\"\n\"isShowMapIcon\": true\n\"mapIconPosition\": { \"x\": 4, \"y\": 120 }"
 * 
 * @param phoneDefaultAppsList
 * @parent PKD_PhoneMenu
 * @type text
 * @text Default Apps
 * @desc List of default Apps for Phone Menu (separated by comma)
 * @default messagesApp, galleryApp, saveApp, loadApp, settingsApp
 * 
 * @param phoneApps:structA
 * @parent phoneDefaultAppsList
 * @type struct<AppItem>[]
 * @text Apps
 * @desc Phone Apps
 * @default ["{\"id:str\":\"messagesApp\",\"name:str\":\"Messages\",\"icon:str\":\"AppIcon_Messages\",\"visibleSwitchId:i\":\"0\",\"enabledSwitchId:i\":\"0\",\"commonEventId:str\":\"Phone.StartApp('messagesApp')\",\"isOuterStart:b\":\"false\",\"alertSwitchId:i\":\"1\"}","{\"id:str\":\"saveApp\",\"name:str\":\"Save\",\"icon:str\":\"AppIcon_SaveGame\",\"visibleSwitchId:i\":\"0\",\"enabledSwitchId:i\":\"0\",\"commonEventId:str\":\"SceneManager.push(Scene_Save)\",\"isOuterStart:b\":\"false\",\"alertSwitchId:i\":\"0\"}","{\"id:str\":\"loadApp\",\"name:str\":\"Load\",\"icon:str\":\"AppIcon_LoadGame\",\"visibleSwitchId:i\":\"0\",\"enabledSwitchId:i\":\"0\",\"commonEventId:str\":\"SceneManager.push(Scene_Load)\",\"isOuterStart:b\":\"false\",\"alertSwitchId:i\":\"0\"}","{\"id:str\":\"settingsApp\",\"name:str\":\"Settings\",\"icon:str\":\"AppIcon_Settings\",\"visibleSwitchId:i\":\"0\",\"enabledSwitchId:i\":\"0\",\"commonEventId:str\":\"SceneManager.push(Scene_Options)\",\"isOuterStart:b\":\"false\",\"alertSwitchId:i\":\"0\"}","{\"id:str\":\"galleryApp\",\"name:str\":\"Gallery\",\"icon:str\":\"AppIcon_Gallery\",\"visibleSwitchId:i\":\"0\",\"enabledSwitchId:i\":\"0\",\"commonEventId:str\":\"Phone.StartApp('galleryApp')\",\"isOuterStart:b\":\"false\",\"alertSwitchId:i\":\"0\"}"]
 * 
 * @param messagesStyle:j
 * @parent PKD_PhoneMenu
 * @type note
 * @text Messages Style
 * @desc Settings, in [param name]:[value] format. You can change values after :
 * @default "\"playerMessagePosition\": \"right\"\n\"playerMessageFontSize\": 14\n\"playerMessageTextColor\": \"#00ff00\"\n\"playerBackRectColor\": \"rgba(0,0,0,0)\"\n\"charMessagePosition\": \"left\"\n\"charMessageFontSize\": 12\n\"charMessageTextColor\": \"#FFFFFF\"\n\"charBackRectColor\": \"rgba(0,0,0,0.7)\""
 * 
 * @param galleryAppSettings:j
 * @parent PKD_PhoneMenu
 * @type note
 * @text Gallery App
 * @desc Settings, in [param name]:[value] format. You can change values after :
 * @default "\"previewImageHeight\": 144\n\"gridCols\": 2"
 * 
 * @param galleryAppButtonsSettings:j
 * @parent galleryAppSettings:j
 * @type note
 * @text Buttons
 * @desc Settings, in [param name]:[value] format. You can change values after :
 * @default "\"backButtonIsVisible\": true\n\"backButtonPosition\": { \"x\": 2, \"y\": 2 }\n\"zoomInButtonIsVisible\": true\n\"zoomInButtonPosition\": { \"x\": 228, \"y\": 2 }"
 * 
 * @param galleryBigMode:b
 * @parent galleryAppSettings:j
 * @text Allow Zoom?
 * @type boolean
 * @desc Is allow extra zoom for image on OK key or with Zoom button?
 * @default true
 * 
 * @param galleryKeepAspect:b
 * @parent galleryAppSettings:j
 * @text Keep Aspect Ratio?
 * @type boolean
 * @desc Is keep aspect ratio of image when preview it?
 * @default true
 * 
 * @param galleryItems:structA
 * @parent galleryAppSettings:j
 * @type struct<GalleryItem>[]
 * @text Pictures
 * @desc Pictures for Gallery App
 * @default []
 * 
 * @param isShowNotifyOnNewMsg:b
 * @parent PKD_PhoneMenu
 * @text New Message Notify?
 * @type boolean
 * @on Show
 * @off No
 * @desc Is show notify when receives new message?
 * @default true
 * 
 * @param newMsgNotifyConfig:j
 * @parent isShowNotifyOnNewMsg:b
 * @type note
 * @text Notify Settings
 * @desc Settings, in [param name]:[value] format. You can change values after :
 * @default "\"image\": \"Notify_NewMessage\"\n\"text\": \"New message from \\\\C[1]$1\"\n\"textPos\": { \"x\": 30, \"y\": 40 }\n\"se\": \"Recovery\""
 * 
 * @param notifySettings:j
 * @parent PKD_PhoneMenu
 * @type note
 * @text Notifications Settings
 * @desc Settings, in [param name]:[value] format. You can change values after :
 * @default "\"position\": { \"x\": \"Graphics.width / 2\", \"y\": 0 }\n\"stayTime\": 100\n\"appearSpeed\": 40\n\"disappearSpeed\": 55\n\"moveOutSpeed\": 6\n\"initialScale\": 0.8\n\"finalScale\": 1.0\n\"isMoveDownWhenMoveOut\": false\n\"defaultFontSize\": 18"
 * 
 * @param isUseAsMainMenu:b
 * @parent PKD_PhoneMenu
 * @type boolean
 * @text Replace Menu
 * @on Replace
 * @off No
 * @desc Are replace Main Menu with Phone Menu?
 * @default false
 * 
 * @param messagesMapId:int
 * @parent PKD_PhoneMenu
 * @text Messages Map ID
 * @type number
 * @min 0
 * @default 0
 * @desc [Optional] Map ID with events for messages. Used when you add message with FromMap = TRUE  
 * 
 * @param modalMenuSettings:j
 * @parent PKD_PhoneMenu
 * @type note
 * @text Modal Menu Settings
 * @desc Settings, in [param name]:[value] format. You can change values after :
 * @default "\"width\": 200\n\"optionLineHeight\": 40\n\"titleHeight\": 60\n\"padding\": 10\n\"menuColor\": \"#FFFFFF\""
 * 
 * @param spacer|endHolder @text‏‏‎ ‎@desc ===============================================
 * 
 * @command EMPTY_HOLDER
 * @text ‏
 * @desc
 * @default
 */
/*:ru
 * @plugindesc (v.0.9)[PRO] Мобильный телефон
 * @author Pheonix KageDesu
 * @target MZ MV
 * @url http://kdworkshop.net/plugins/phone-menu
 *
 * @help
 * ---------------------------------------------------------------------------
 * 
 * ===========================================================================
 *
 * Плагин добавлят новое меню ввиду смартфона, а также альтернативную систему сообщений
 * Можно добавлять свои элементы меню в телефон (создаются они в параметрах плагина)
 *
 * Ресурсы тут: img\pPhoneMenu, файлы можно редактировать
 *
 * ---------------------------------------------------------------------------
 * Вызовы скриптов:
 * 
 * - Phone.Show(); - Открыть телефон
 * - Phone.Hide(); - Закрыть
 * - Phone.Disable(); - Отключить (нельзя открыт по нажатию кнопки)
 * - Phone.Enable(); - Включить
 *
 * - Phone.AddApp(ID); - Добавить элемент меню по ID (из параметров плагина)
 * - Phone.RemoveApp(ID); - Удалить элемент из меню
 *
 * - Phone.ChangePhone("ИМЯ"); - Изменить графику телефона на ИМЯ.png
 *              картинка должна быть в папке img\pPhoneMenu
 *
 * - Phone.ChangeWallpaper("ИМЯ"); - Аналогично, только для обоев телефона
 *
 * - Phone.ChangeMessageWallpaper("NAME"); - Фон в приложении сообщений
 * - Phone.ChangeGalleryWallpaper("NAME"); - Фон в приложении галлерея
 *
 *
 * Вызовы скриптов относительно иконки телефона на карте:
 *
 * - PhoneIcon.Show(); - Показать
 * - PhoneIcon.Hide(); - Спрятать
 * - PhoneIcon.Enable(); - Включить
 * - PhoneIcon.Disable(); - Отключить
 *
 * Вызов скрипта для оповещения:
 *
 * Phone.Notify({image: "ИМЯ", text: "ТЕКСТ", textPos: [X, Y], se: "ИМЯ ЗВУКА" });
 *
 * !Картинка должна быть в папке \img\pPhoneMenu\
 *
 * Examples:
        Phone.Notify({image: "Notify_NewMessage"});
        Phone.Notify({image: "Notify_NewMessage", text: "Hello!"});
        Phone.Notify({image: "Notify_NewMessage", text: "Hello!", textPos: [10, 20]});
        Phone.Notify({image: "Notify_NewMessage", text: "Hello!", textPos: [10, 20], se: "Attack1" });
 *
 * Вызов скрипта для меню выбора:
 *
 * Phone.ShowModalMessage("TITLE TEXT", "BUTTON TITLE"); - Простое сообщение с одной кнопкой
 * Phone.ShowModalQuestion("TITLE TEXT", "BUTTON 1 TITLE", BUTTON_1_ACTION, "BUTTON 2 TITLE", BUTTON_2_ACTION);
 *     Сообщение с двумя кнопками
 *     Где: BUTTON_ACTION может быть номером общего события или вызовом скрипта (в кавычках)
 *
 * Phone.ShowModalMenu("TITLE TEXT", ID, FromMap?); - Показать меню из тела события
 *           Where: FromMap - Опционально, если true, то тело меню загружается не из
 *            общего события, а из события ID на специальной карте, заданной
 *            через параметр плагина Messages Map
 *
 * Examples:
       Phone.ShowModalMessage("Autosave done!", "OK");
       Phone.ShowModalQuestion("Load autosave?", "Yes", 1, "No", "console.log('canceled')");
       Phone.ShowModalMenu("Select wallpaper", 4, false);
 *
 * ---------------------------------------------------------------------------
 * Система сообщений в телефоне:
 *
 * Вызов скрипта чтобы добавить новое сообщение:
 *
 * - Phone.AddMessage(A, N, ID, FromMap);
 *      A - Имя картинки аватара, N - Имя автора (от кого),
 *          ID - Номер общего события с содержанием сообщения (текстом)
 *
 *      FromMap - Опционально, если true, то тело сообщения загружается не из
 *            общего события, а из события ID на специальной карте, заданной
 *            через параметр плагина Messages Map
 *
 * Общее событие может содержать обычные сообщения (и или варианты выбора)
 *  (поддерживается выбор только из 2х вариантов)
 *
 * Пример: Phone.AddMessage("avaActor1", "Джон", 22); // Сообщение из общего события 22
 * Пример: Phone.AddMessage("avaActor2", "Алиса", 4, true); // Из события 4 на карте Messages Map 
 *
 * Так-же поддерживаются след. команды события:
 *  - Вызов общего события
 *  - Переключение переменной
 *  - Переключение переключателя
 *  - Команда плагин (только для RPG Maker MV)
 *
 * - Phone.IsHaveNewMessages(); - Возращает истину, если есть хоть одно НЕ прочитанное
 *      сообщение
 *
 * Для стандартного элемента меню Сообщения (с ID "messagesApp" ) параметр
 * Alert Switch переключается на ВКЛ автоматически. (Срабатывает при вызове Phone.AddMessage(...))
 * (Т.е. для сообщений красный значёк что есть новое сообещние - автоматически работает)
 *
 * ---------------------------------------------------------------------------
 * ! Примеры использования комманд можно найти в демке !
 * ---------------------------------------------------------------------------
 * Если Вам нравятся мои плагины, поддержите меня на Boosty!
 * 
 * Boosty Page:
 *      https://boosty.to/kagedesu
 * YouTube Channel:
 *      https://www.youtube.com/channel/UCA3R61ojF5vp5tGwJ1YqdgQ?
 *
 * 

* Лицензия: Creative Commons 4.0 Attribution, Share Alike, Commercial

 *
 * 
 * @param PKD_PhoneMenu
 * 
 * @param phoneSettings:j
 * @parent PKD_PhoneMenu
 * @type note
 * @text Phone Settings
 * @desc Телефон. Настройки в формате [имя параметра]:[значение]. Только значение после : можно менять
 * @default "\"openPhoneKey\": \"p\"\n\"screenSize\": { \"w\": 278, \"h\": 434 }\n\"screenOffset\": { \"x\": 16, \"y\": 86 }\n\"phonePosition\": { \"x\": \"Graphics.width / 2 - 155\", \"y\": \"20\" }\n\"appsGrid\": { \"x\": 3, \"y\": 4 }\n\"isAnimate\": true\n\"animationSpeed\": 24\n\"appBackgroundColor\": \"#FFF\"\n\"image\": \"PhoneFace\"\n\"wallpaper\": \"Wallpaper1\"\n\"isShowMapIcon\": true\n\"mapIconPosition\": { \"x\": 4, \"y\": 120 }"
 * 
 * @param phoneDefaultAppsList
 * @parent PKD_PhoneMenu
 * @type text
 * @text Default Apps
 * @desc Набор стандартных приложений (ID через запятую)
 * @default messagesApp, galleryApp, saveApp, loadApp, settingsApp
 * 
 * @param phoneApps:structA
 * @parent phoneDefaultAppsList
 * @type struct<AppItem>[]
 * @text Apps
 * @desc Приложения (пункт меню) для телефона
 * @default ["{\"id:str\":\"messagesApp\",\"name:str\":\"Messages\",\"icon:str\":\"AppIcon_Messages\",\"visibleSwitchId:i\":\"0\",\"enabledSwitchId:i\":\"0\",\"commonEventId:str\":\"Phone.StartApp('messagesApp')\",\"isOuterStart:b\":\"false\",\"alertSwitchId:i\":\"1\"}","{\"id:str\":\"saveApp\",\"name:str\":\"Save\",\"icon:str\":\"AppIcon_SaveGame\",\"visibleSwitchId:i\":\"0\",\"enabledSwitchId:i\":\"0\",\"commonEventId:str\":\"SceneManager.push(Scene_Save)\",\"isOuterStart:b\":\"false\",\"alertSwitchId:i\":\"0\"}","{\"id:str\":\"loadApp\",\"name:str\":\"Load\",\"icon:str\":\"AppIcon_LoadGame\",\"visibleSwitchId:i\":\"0\",\"enabledSwitchId:i\":\"0\",\"commonEventId:str\":\"SceneManager.push(Scene_Load)\",\"isOuterStart:b\":\"false\",\"alertSwitchId:i\":\"0\"}","{\"id:str\":\"settingsApp\",\"name:str\":\"Settings\",\"icon:str\":\"AppIcon_Settings\",\"visibleSwitchId:i\":\"0\",\"enabledSwitchId:i\":\"0\",\"commonEventId:str\":\"SceneManager.push(Scene_Options)\",\"isOuterStart:b\":\"false\",\"alertSwitchId:i\":\"0\"}","{\"id:str\":\"galleryApp\",\"name:str\":\"Gallery\",\"icon:str\":\"AppIcon_Gallery\",\"visibleSwitchId:i\":\"0\",\"enabledSwitchId:i\":\"0\",\"commonEventId:str\":\"Phone.StartApp('galleryApp')\",\"isOuterStart:b\":\"false\",\"alertSwitchId:i\":\"0\"}"]
 * 
 * @param messagesStyle:j
 * @parent PKD_PhoneMenu
 * @type note
 * @text Messages Style
 * @desc Стиль сообщений. Настройки в формате [имя параметра]:[значение]. Только значение после : можно менять
 * @default "\"playerMessagePosition\": \"right\"\n\"playerMessageFontSize\": 14\n\"playerMessageTextColor\": \"#00ff00\"\n\"playerBackRectColor\": \"rgba(0,0,0,0)\"\n\"charMessagePosition\": \"left\"\n\"charMessageFontSize\": 12\n\"charMessageTextColor\": \"#FFFFFF\"\n\"charBackRectColor\": \"rgba(0,0,0,0.7)\""
 * 
 * @param galleryAppSettings:j
 * @parent PKD_PhoneMenu
 * @type note
 * @text Gallery App
 * @desc Настройки в формате [имя параметра]:[значение]. Только значение после : можно менять
 * @default "\"previewImageHeight\": 144\n\"gridCols\": 2"
 * 
 * @param galleryAppButtonsSettings:j
 * @parent galleryAppSettings:j
 * @type note
 * @text Buttons
 * @desc Настройки в формате [имя параметра]:[значение]. Только значение после : можно менять
 * @default "\"backButtonIsVisible\": true\n\"backButtonPosition\": { \"x\": 2, \"y\": 2 }\n\"zoomInButtonIsVisible\": true\n\"zoomInButtonPosition\": { \"x\": 228, \"y\": 2 }"
 * 
 * @param galleryBigMode:b
 * @parent galleryAppSettings:j
 * @text Allow Zoom?
 * @type boolean
 * @desc Разрешить доп. увеличние картинки по нажатию ОК (или кнопкой)?
 * @default true
 * 
 * @param galleryKeepAspect:b
 * @parent galleryAppSettings:j
 * @text Keep Aspect Ratio?
 * @type boolean
 * @desc Сохранять пропорции изображения при просмотре? (когда открываем картинку)
 * @default true
 * 
 * @param galleryItems:structA
 * @parent galleryAppSettings:j
 * @type struct<GalleryItem>[]
 * @text Pictures
 * @desc Картинки для галереи
 * @default []
 * 
 * @param isShowNotifyOnNewMsg:b
 * @parent PKD_PhoneMenu
 * @text New Message Notify?
 * @type boolean
 * @on Show
 * @off No
 * @desc Показывать уведомление при получении нового сообщения?
 * @default true
 * 
 * @param newMsgNotifyConfig:j
 * @parent isShowNotifyOnNewMsg:b
 * @type note
 * @text Notify Settings
 * @desc Настройки в формате [имя параметра]:[значение]. Только значение после : можно менять
 * @default "\"image\": \"Notify_NewMessage\"\n\"text\": \"New message from \\\\C[1]$1\"\n\"textPos\": { \"x\": 30, \"y\": 40 }\n\"se\": \"Recovery\""
 * 
 * @param notifySettings:j
 * @parent PKD_PhoneMenu
 * @type note
 * @text Notifications Settings
 * @desc Уведомления. Настройки в формате [имя параметра]:[значение]. Только значение после : можно менять
 * @default "\"position\": { \"x\": \"Graphics.width / 2\", \"y\": 0 }\n\"stayTime\": 100\n\"appearSpeed\": 40\n\"disappearSpeed\": 55\n\"moveOutSpeed\": 6\n\"initialScale\": 0.8\n\"finalScale\": 1.0\n\"isMoveDownWhenMoveOut\": false\n\"defaultFontSize\": 18"
 * 
 * @param isUseAsMainMenu:b
 * @parent PKD_PhoneMenu
 * @type boolean
 * @text Replace Menu
 * @on Заместо
 * @off Нет
 * @desc Открывать телефон заместо главного меню?
 * @default false
 * 
 * @param messagesMapId:int
 * @parent PKD_PhoneMenu
 * @text Messages Map ID
 * @type number
 * @min 0
 * @default 0
 * @desc [Опционально] ID с событиями для сообщений
 * 
 * @param modalMenuSettings:j
 * @parent PKD_PhoneMenu
 * @type note
 * @text Modal Menu Settings
 * @desc Меню выбора. Настройки в формате [имя параметра]:[значение]. Только значение после : можно менять
 * @default "\"width\": 200\n\"optionLineHeight\": 40\n\"titleHeight\": 60\n\"padding\": 10\n\"menuColor\": \"#FFFFFF\""
 * 
 * @param spacer|endHolder @text‏‏‎ ‎@desc ===============================================
 * 
 * @command EMPTY_HOLDER
 * @text ‏
 * @desc
 * @default
 */
/*~struct~AppItem:

 @param id:str
 @text ID
 @type text 
 @desc Unique App ID for add or remove by script call to Phone Menu
 @default myApp

 @param name:str
 @text Name
 @type text 
 @desc Displayed name in Phone Menu
 @default MyApp 


 @param icon:str
 @text Icon
 @type file
 @dir img\pPhoneMenu\
 @require 1
 @desc Icon image name 
 @default 

 @param visibleSwitchId:i
 @text Visible Switch
 @type switch 
 @desc Switch for APP visibility
 @default 0


 @param enabledSwitchId:i
 @text Available Switch
 @type switch 
 @desc Switch for APP enabled or disable state
 @default 0


 @param commonEventId:str
 @text Common Event
 @type common_event 
 @desc Common Event for App (or script call)
 @default 1


 @param isOuterStart:b
 @text Is exit when started?
 @type boolean 
 @on Yes
 @off No
 @desc If true - App will close phone and will be executed on game map
 @default false 


 @param alertSwitchId:i
 @text Alert Switch
 @type switch 
 @desc When this Switch is ON, you will see red alert cirle on this App icon
 @default 0

*/

/*~struct~AppItem:ru

 @param id:str
 @text ID
 @type text 
 @desc Уник. ID исп. чтобы добавлять (убирать) приложение при помощи вызова скрипта
 @default myApp

 @param name:str
 @text Name
 @type text 
 @desc Отображаемое имя
 @default MyApp 


 @param icon:str
 @text Icon
 @type file
 @dir img\pPhoneMenu\
 @require 1
 @desc Изображение иконки
 @default 

 @param visibleSwitchId:i
 @text Visible Switch
 @type switch 
 @desc Переключетель для видимости приложения в меню
 @default 0


 @param enabledSwitchId:i
 @text Available Switch
 @type switch 
 @desc Переключатель для возможности запуска приложения в меню
 @default 0


 @param commonEventId:str
 @text Common Event
 @type common_event 
 @desc Общее событие для этого приложения
 @default 1


 @param isOuterStart:b
 @text Is exit when started?
 @type boolean 
 @on Да
 @off Нет
 @desc Если ДА, то после запуска приложения, телефон закроется, а общее событие будет вып-но на карте
 @default false 


 @param alertSwitchId:i
 @text Alert Switch
 @type switch 
 @desc Когда этот переключатель ВКЛ, то будет видет красный круг на иконке приложения
 @default 0

*/


/*~struct~GalleryItem:

 @param picName:str
 @text Picture
 @type file
 @dir img\pPhoneMenu\
 @require 1
 @default 

 @param previewPicName:str
 @text Preview
 @type file
 @dir img\pPhoneMenu\
 @require 1
 @desc Optional. Preview picture for album grid
 @default

 @param albumName:str
 @text Album
 @type text 
 @desc Required! Album Name
 @default Default 

 @param title:str
 @text Name
 @type text 
 @desc Optional. Picture Name
 @default

 @param enabledSwitchId:i
 @text Enabled Switch
 @type switch 
 @desc When this Switch is ON, you will see this image in Gallery App. 0 - always available
 @default 0

*/


var Imported = Imported || {};
Imported.PKD_PhoneMenu = true;

var PKD_PhoneMenu = {};
PKD_PhoneMenu.Version = 90;

//?VERSION
PKD_PhoneMenu.isPro = function() { return false; };

PKD_PhoneMenu.PP = {};
PKD_PhoneMenu.Utils = {};

// * Загрзука параметров
PKD_PhoneMenu.LoadPluginSettings = () => {
    PKD_PhoneMenu.PP._loader = new KDCore.ParamLoader('PKD_PhoneMenu');
};

window.Phone = PKD_PhoneMenu;

// * ROADMAP
// 1.0 - User Apps (you can create own simple App for Phone for your game purposes)
// 1.X+ More default comples Apps (like messages) and extra features

// --- --- --- --- ---

//%[Для обновлений]
// * SubMenus (simple list) 
// Управляется SubMenu через вызовы скриптов Phone.AddItemToSubMenu("myMenu1", {img: "test", title: "Text", enbledSwitch:0, onClick: 2, onMap: true});
// * CE - должен поддерживать Extended Values, title - Extended Text

// * Возможность задавать background картинку для сообщений от того или иного персонажа (каждому свою)

// * Notify Auto when gallery items added ?

// * Добавить перелистывание картинок в режиме Zoom (в галерее), кнопки или стрелками или колесом мышки


/*
# ==========================================================================
# ==========================================================================
#
#   EMBEDDED PHEONIX KAGEDESU PLUGINS CORE LIBRARY
#   (This plugin may not use the entire code of this library)
#
# ==========================================================================
# ==========================================================================
 * 
 * 
 */



// Generated by CoffeeScript 2.6.1
// ==========================================================================
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ KDCore.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
// * LIBRARY WITH MZ AND MZ SUPPORT
//! {OUTER FILE}

//?rev 20.05.23
var KDCore;

window.Imported = window.Imported || {};

Imported.KDCore = true;

KDCore = KDCore || {};

// * Двузначные числа нельзя в версии, сравнение идёт по первой цифре поулчается (3.43 - нельзя, можно 3.4.3)
//%[МЕНЯТЬ ПРИ ИЗМЕНЕНИИ]
KDCore._fileVersion = '3.2.6';

// * Методы и библиотеки данной версии
KDCore._loader = 'loader_' + KDCore._fileVersion;

KDCore[KDCore._loader] = [];

// * Добавить библиотеку на загрузку
KDCore.registerLibraryToLoad = function(lib) {
  return KDCore[KDCore._loader].push(lib);
};

if ((KDCore.Version != null) && KDCore.Version >= KDCore._fileVersion) {
  // * ПРОПУСКАЕМ ЗАГРУЗКУ, так как уже загруженна более новая
  console.log('XDev KDCore ' + KDCore._fileVersion + ' skipped by new or exists version');
  KDCore._requireLoadLibrary = false;
} else {
  KDCore.Version = KDCore._fileVersion;
  KDCore.LIBS = KDCore.LIBS || {};
  KDCore.register = function(library) {
    return this.LIBS[library.name] = library;
  };
  window.KDCore = KDCore;
  // * ТРЕБУЕТСЯ ЗАГРУЗКА БИБЛИОТЕК
  KDCore._requireLoadLibrary = true;
}


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  Array.prototype.delete = function() {
    var L, a, ax, what;
    what = void 0;
    a = arguments;
    L = a.length;
    ax = void 0;
    while (L && this.length) {
      what = a[--L];
      while ((ax = this.indexOf(what)) !== -1) {
        this.splice(ax, 1);
      }
    }
    return this;
  };
  Array.prototype.max = function() {
    return Math.max.apply(null, this);
  };
  Array.prototype.min = function() {
    return Math.min.apply(null, this);
  };
  Array.prototype.sample = function() {
    if (this.length === 0) {
      return [];
    }
    return this[KDCore.SDK.rand(0, this.length - 1)];
  };
  Array.prototype.first = function() {
    return this[0];
  };
  Array.prototype.last = function() {
    return this[this.length - 1];
  };
  Array.prototype.shuffle = function() {
    var k, n, v;
    n = this.length;
    while (n > 1) {
      n--;
      k = KDCore.SDK.rand(0, n + 1);
      v = this[k];
      this[k] = this[n];
      this[n] = v;
    }
  };
  Array.prototype.count = function() {
    return this.length;
  };
  Array.prototype.isEmpty = function() {
    return this.length === 0;
  };
  // * Ищет элемент, у которого поле ID == id
  Array.prototype.getById = function(id) {
    return this.getByField('id', id);
  };
  // * Ищет элемент, у которого поле FIELD (имя поля) == value
  Array.prototype.getByField = function(field, value) {
    var e;
    try {
      return this.find(function(item) {
        return item[field] === value;
      });
    } catch (error) {
      e = error;
      console.warn(e);
      return null;
    }
  };
  Object.defineProperty(Array.prototype, "delete", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "max", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "min", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "sample", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "first", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "last", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "shuffle", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "count", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "isEmpty", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "getById", {
    enumerable: false
  });
  return Object.defineProperty(Array.prototype, "getByField", {
    enumerable: false
  });
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  Number.prototype.do = function(method) {
    return KDCore.SDK.times(this, method);
  };
  Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
  };
  return Number.prototype.any = function(number) {
    return (number != null) && number > 0;
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  String.prototype.toCss = function() {
    return KDCore.Color.FromHex(this).CSS;
  };
  String.prototype.toCSS = function() {
    return this.toCss();
  };
  String.prototype.isEmpty = function() {
    return this.length === 0 || !this.trim();
  };
  String.isNullOrEmpty = function(str) {
    if (str != null) {
      return str.toString().isEmpty();
    } else {
      return true;
    }
  };
  String.any = function(str) {
    return !String.isNullOrEmpty(str);
  };
  return String.prototype.replaceAll = function(search, replacement) {
    var target;
    target = this;
    return target.split(search).join(replacement);
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  KDCore.isMV = function() {
    return Utils.RPGMAKER_NAME.contains("MV");
  };
  KDCore.isMZ = function() {
    return !KDCore.isMV();
  };
  KDCore.warning = function(msg, error) {
    if (msg != null) {
      console.warn(msg);
    }
    if (error != null) {
      console.warn(error);
    }
  };
  KDCore.makeid = function(length) {
    var characters, charactersLength, i, result;
    result = '';
    characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    charactersLength = characters.length;
    i = 0;
    while (i < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      i++;
    }
    return result;
  };
  return KDCore.makeId = function() {
    return KDCore.makeid(...arguments);
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var SDK;
  //?[DEPRECATED]
  // * SDK
  //------------------------------------------------------------------------------
  SDK = function() {
    throw new Error('This is a static class');
  };
  SDK.rand = function(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
  };
  SDK.setConstantToObject = function(object, constantName, constantValue) {
    object[constantName] = constantValue;
    if (typeof object[constantName] === 'object') {
      Object.freeze(object[constantName]);
    }
    Object.defineProperty(object, constantName, {
      writable: false
    });
  };
  SDK.convertBitmapToBase64Data = function(bitmap) {
    return bitmap._canvas.toDataURL('image/png');
  };
  SDK.times = function(times, method) {
    var i, results;
    i = 0;
    results = [];
    while (i < times) {
      method(i);
      results.push(i++);
    }
    return results;
  };
  SDK.toGlobalCoord = function(layer, coordSymbol = 'x') {
    var node, t;
    t = layer[coordSymbol];
    node = layer;
    while (node) {
      t -= node[coordSymbol];
      node = node.parent;
    }
    return (t * -1) + layer[coordSymbol];
  };
  SDK.canvasToLocalX = function(layer, x) {
    while (layer) {
      x -= layer.x;
      layer = layer.parent;
    }
    return x;
  };
  SDK.canvasToLocalY = function(layer, y) {
    while (layer) {
      y -= layer.y;
      layer = layer.parent;
    }
    return y;
  };
  SDK.isInt = function(n) {
    return Number(n) === n && n % 1 === 0;
  };
  SDK.isFloat = function(n) {
    return Number(n) === n && n % 1 !== 0;
  };
  SDK.checkSwitch = function(switchValue) {
    if (switchValue === 'A' || switchValue === 'B' || switchValue === 'C' || switchValue === 'D') {
      return true;
    }
    return false;
  };
  SDK.toNumber = function(string, none = 0) {
    var number;
    if (string == null) {
      return none;
    }
    number = Number(string);
    if (isNaN(number)) {
      return none;
    }
    return number;
  };
  SDK.isString = function(value) {
    return typeof value === "string";
  };
  SDK.isArray = function(value) {
    return Array.isArray(value);
  };
  //@[EXTEND]
  return KDCore.SDK = SDK;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var __alias_Bitmap_blt_kdCore, __alias_Bitmap_fillAll_kdCore;
  //@[ALIAS]
  __alias_Bitmap_fillAll_kdCore = Bitmap.prototype.fillAll;
  Bitmap.prototype.fillAll = function(color) {
    if (color instanceof KDCore.Color) {
      return this.fillRect(0, 0, this.width, this.height, color.CSS);
    } else {
      return __alias_Bitmap_fillAll_kdCore.call(this, color);
    }
  };
  //@[ALIAS]
  __alias_Bitmap_blt_kdCore = Bitmap.prototype.blt;
  Bitmap.prototype.blt = function(source, sx, sy, sw, sh, dx, dy, dw, dh) {
    if (this._needModBltDWH > 0) {
      dh = dw = this._needModBltDWH;
      __alias_Bitmap_blt_kdCore.call(this, source, sx, sy, sw, sh, dx, dy, dw, dh);
      this._needModBltDWH = null;
    } else {
      __alias_Bitmap_blt_kdCore.call(this, ...arguments);
    }
  };
  Bitmap.prototype.drawIcon = function(x, y, icon, size = 32, noSmoth = false) {
    var bitmap;
    bitmap = null;
    if (icon instanceof Bitmap) {
      bitmap = icon;
    } else {
      bitmap = KDCore.BitmapSrc.LoadFromIconIndex(icon).bitmap;
    }
    this._context.imageSmoothingEnabled = !noSmoth;
    this.drawOnMe(bitmap, x, y, size, size);
    this._context.imageSmoothingEnabled = true;
  };
  Bitmap.prototype.drawOnMe = function(bitmap, x = 0, y = 0, sw = 0, sh = 0) {
    if (sw <= 0) {
      sw = bitmap.width;
    }
    if (sh <= 0) {
      sh = bitmap.height;
    }
    this.blt(bitmap, 0, 0, bitmap.width, bitmap.height, x, y, sw, sh);
  };
  Bitmap.prototype.drawInMe = function(bitmap) {
    return Bitmap.prototype.drawOnMe(bitmap, 0, 0, this.width, this.height);
  };
  return Bitmap.prototype.drawTextFull = function(text, position = 'center') {
    return this.drawText(text, 0, 0, this.width, this.height, position);
  };
});


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_CharacterBase.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_CharacterBase.prototype;
  // * Нахожусь ли Я в точке по диагонале (рядом), относительно char
  _.kdInDiagonalPointRelativeTo = function(char) {
    var e, x, y;
    try {
      if (char == null) {
        return false;
      }
      ({x, y} = char);
      if (x === this.x - 1 && ((y === this.y - 1) || (y === this.y + 1))) {
        return true; // * left up or down
      }
      if (x === this.x + 1 && (y === this.y - 1 || y === this.y + 1)) {
        return true; // * right up or down
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return false;
  };
})();

// ■ END Game_CharacterBase.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  // * В MZ нету данной функции, а она часто используется в моих плагинах
  if (!KDCore.isMZ()) {
    return;
  }
  //?[NEW] (from MV)
  return ImageManager.loadEmptyBitmap = function() {
    if (this._emptyBitmap != null) {
      return this._emptyBitmap;
    } else {
      return new Bitmap();
    }
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var _input_onKeyDown, _input_onKeyUp, i, j, k, l;
  Input.KeyMapperPKD = {};
//Numbers
  for (i = j = 48; j <= 57; i = ++j) {
    Input.KeyMapperPKD[i] = String.fromCharCode(i);
  }
//Letters Upper
  for (i = k = 65; k <= 90; i = ++k) {
    Input.KeyMapperPKD[i] = String.fromCharCode(i).toLowerCase();
  }
//Letters Lower (for key code events)
  for (i = l = 97; l <= 122; i = ++l) {
    Input.KeyMapperPKD[i] = String.fromCharCode(i).toLowerCase();
  }
  
  //@[ALIAS]
  _input_onKeyDown = Input._onKeyDown;
  Input._onKeyDown = function(event) {
    _input_onKeyDown.call(this, event);
    if (Input.keyMapper[event.keyCode]) {
      return;
    }
    Input._setStateWithMapperPKD(event.keyCode);
  };
  //@[ALIAS]
  _input_onKeyUp = Input._onKeyUp;
  Input._onKeyUp = function(event) {
    _input_onKeyUp.call(this, event);
    if (Input.keyMapper[event.keyCode]) {
      return;
    }
    Input._setStateWithMapperPKD(event.keyCode, false);
  };
  //?NEW
  Input._setStateWithMapperPKD = function(keyCode, state = true) {
    var symbol;
    symbol = Input.KeyMapperPKD[keyCode];
    if (symbol != null) {
      return this._currentState[symbol] = state;
    }
  };
  //?NEW
  Input.isCancel = function() {
    return Input.isTriggered('cancel') || TouchInput.isCancelled();
  };
  //?NEW
  return TouchInput.toPoint = function() {
    return new KDCore.Point(TouchInput.x, TouchInput.y);
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  PluginManager.getPluginParametersByRoot = function(rootName) {
    var pluginParameters, property;
    for (property in this._parameters) {
      if (this._parameters.hasOwnProperty(property)) {
        pluginParameters = this._parameters[property];
        if (PluginManager.isPluginParametersContentKey(pluginParameters, rootName)) {
          return pluginParameters;
        }
      }
    }
    return PluginManager.parameters(rootName);
  };
  return PluginManager.isPluginParametersContentKey = function(pluginParameters, key) {
    return pluginParameters[key] != null;
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var ___Sprite_alias_Move_KDCORE_2;
  Sprite.prototype.moveToCenter = function(dx = 0, dy = 0) {
    return this.move(-this.bitmap.width / 2 + dx, -this.bitmap.height / 2 + dy);
  };
  Sprite.prototype.setStaticAnchor = function(floatX = 1, floatY = 1) {
    this.x -= Math.round(this.width * floatX);
    this.y -= Math.round(this.height * floatY);
  };
  Sprite.prototype.moveToParentCenter = function() {
    if (!this.parent) {
      return;
    }
    return this.move(this.parent.width / 2, this.parent.height / 2);
  };
  ___Sprite_alias_Move_KDCORE_2 = Sprite.prototype.move;
  Sprite.prototype.move = function(x, y) {
    if (x instanceof Array) {
      return ___Sprite_alias_Move_KDCORE_2.call(this, x[0], x[1]);
    } else if (x instanceof KDCore.Point || ((x != null ? x.x : void 0) != null)) {
      return ___Sprite_alias_Move_KDCORE_2.call(this, x.x, x.y);
    } else if ((x != null) && (x._x != null)) {
      return ___Sprite_alias_Move_KDCORE_2.call(this, x._x, x._y);
    } else {
      return ___Sprite_alias_Move_KDCORE_2.call(this, x, y);
    }
  };
  Sprite.prototype.isContainsPoint = function(point) {
    var rect, rx, ry;
    if (this.width === 0 || this.height === 0) {
      return false;
    }
    rx = KDCore.SDK.toGlobalCoord(this, 'x');
    ry = KDCore.SDK.toGlobalCoord(this, 'y');
    rect = this._getProperFullRect(rx, ry);
    return rect.contains(point.x, point.y);
  };
  // * Возвращает Rect с учётом Scale и Anchor спрайта
  Sprite.prototype._getProperFullRect = function(rx, ry) {
    var height, width, x, y;
    width = this.width * Math.abs(this.scale.x);
    height = this.height * Math.abs(this.scale.y);
    x = rx - this.anchor.x * width;
    y = ry - this.anchor.y * height;
    if (this.anchor.x === 0 && this.scale.x < 0) {
      x += this.width * this.scale.x;
    }
    if (this.anchor.y === 0 && this.scale.y < 0) {
      y += this.height * this.scale.y;
    }
    return new PIXI.Rectangle(x, y, width, height);
  };
  Sprite.prototype.fillAll = function(color) {
    if (color != null) {
      return this.bitmap.fillAll(color);
    } else {
      return this.fillAll(KDCore.Color.WHITE);
    }
  };
  return Sprite.prototype.removeFromParent = function() {
    if (this.parent != null) {
      return this.parent.removeChild(this);
    }
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  return TouchInput.toMapPoint = function() {
    return this.toPoint().convertToMap();
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  KDCore.Utils = KDCore.Utils || {};
  return (function() {
    var _;
    _ = KDCore.Utils;
    _.getJDataById = function(id, source) {
      var d, j, len;
      for (j = 0, len = source.length; j < len; j++) {
        d = source[j];
        if (d.id === id) {
          return d;
        }
      }
      return null;
    };
    _.hasMeta = function(symbol, obj) {
      return (obj != null) && (obj.meta != null) && (obj.meta[symbol] != null);
    };
    _.getValueFromMeta = function(symbol, obj) {
      if (!_.hasMeta(symbol, obj)) {
        return null;
      }
      return obj.meta[symbol];
    };
    _.getNumberFromMeta = function(symbol, obj) {
      var value;
      if (!_.hasMeta(symbol, obj)) {
        return null;
      }
      if (obj.meta[symbol] === true) {
        return 0;
      } else {
        value = KDCore.SDK.toNumber(obj.meta[symbol], 0);
      }
      return value;
    };
    _.isSceneMap = function() {
      try {
        return !SceneManager.isSceneChanging() && SceneManager._scene instanceof Scene_Map;
      } catch (error) {
        return false;
      }
    };
    _.isMapScene = function() {
      return this.isSceneMap();
    };
    _.isSceneBattle = function() {
      try {
        return !SceneManager.isSceneChanging() && SceneManager._scene instanceof Scene_Battle;
      } catch (error) {
        return false;
      }
    };
    _.isBattleScene = function() {
      return this.isSceneBattle();
    };
    _.getEventCommentValue = function(commentCode, list) {
      var comment, e, i, item;
      try {
        if (list && list.length > 1) {
          i = 0;
          while (i < list.length) {
            item = list[i++];
            if (!item) {
              continue;
            }
            if (item.code === 108) {
              comment = item.parameters[0];
              if (comment.contains(commentCode)) {
                return comment;
              }
            }
          }
        }
      } catch (error) {
        e = error;
        console.warn(e);
      }
      return null;
    };
    _.getEventCommentValueArray = function(commentCode, list) {
      var comment, comments, e, i, item;
      try {
        comments = [];
        if (list && list.length > 1) {
          i = 0;
          while (i < list.length) {
            item = list[i++];
            if (!item) {
              continue;
            }
            if (item.code === 108) {
              comment = item.parameters[0];
              if (comment.contains(commentCode)) {
                comments.push(comment);
              }
            }
          }
        }
      } catch (error) {
        e = error;
        console.warn(e);
      }
      return comments;
    };
    _.getPositionPointFromJSON = function(jsonSettings) {
      return _.convertPositionPointFromJSON(jsonSettings.position);
    };
    _.convertPositionPointFromJSON = function(position) {
      var e, x, y;
      try {
        x = position[0];
        y = position[1];
        if (!KDCore.SDK.isInt(x)) {
          x = eval(x);
        }
        if (!KDCore.SDK.isInt(y)) {
          y = eval(y);
        }
        return new KDCore.Point(x, y);
      } catch (error) {
        e = error;
        console.warn('Utils.getPositionPointFromJSON', e);
        return KDCore.Point.Empty;
      }
    };
    _.jsonPos = function(jsonPosition) {
      return _.convertPositionPointFromJSON(jsonPosition);
    };
    _.jsonPosXY = function(jsonPosition) {
      var e, x, y;
      try {
        ({x, y} = jsonPosition);
        return new KDCore.Point(eval(x), eval(y));
      } catch (error) {
        e = error;
        console.warn('Utils.jsonPosXY', e);
        return KDCore.Point.Empty;
      }
    };
    _.getVar = function(id) {
      return $gameVariables.value(id);
    };
    _.setVar = function(id, value) {
      return $gameVariables.setValue(id, value);
    };
    _.addToVar = function(id, value) {
      var prevVal;
      prevVal = _.getVar(id);
      return _.setVar(id, prevVal + value);
    };
    _.playSE = function(seFileName, pitch = 100, volume = 100) {
      var sound;
      if (seFileName == null) {
        return;
      }
      if (seFileName === "") {
        return;
      }
      sound = {
        name: seFileName,
        pan: 0,
        pitch: pitch,
        volume: volume
      };
      AudioManager.playStaticSe(sound);
    };
    _.getItemTypeId = function(item) {
      if (DataManager.isWeapon(item)) {
        return 1;
      } else if (DataManager.isArmor(item)) {
        return 2;
      }
      return 0;
    };
    _.getItemByType = function(itemId, typeId) {
      var data, e;
      try {
        if ((typeId != null) && !isFinite(typeId) && KDCore.SDK.isString(typeId) && String.any(typeId)) {
          if (typeId[0] === "w") {
            typeId = 1;
          } else if (typeId[0] === "a") {
            typeId = 2;
          } else {
            typeId = 0;
          }
        }
        data = [$dataItems, $dataWeapons, $dataArmors];
        return data[typeId][itemId];
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return null;
      }
    };
    _.loadFont = function(name) {
      if (typeof FontManager === "undefined" || FontManager === null) {
        return;
      }
      if (String.isNullOrEmpty(name)) {
        return;
      }
      if (FontManager._states[name] != null) {
        return;
      }
      FontManager.load(name, name + ".ttf");
    };
    _.convertTimeShort = function(seconds) {
      var e;
      try {
        if (seconds > 59) {
          return Math.floor(seconds / 60) + 'm';
        } else {
          return seconds;
        }
      } catch (error) {
        e = error;
        console.warn(e);
        return seconds;
      }
    };
    _.isPointInScreen = function(point, margin = 10) {
      var maxH, maxW, screenMargin, x, y;
      ({x, y} = point);
      maxW = Graphics.width;
      maxH = Graphics.height;
      // * Граница от краёв экрана
      screenMargin = margin;
      if (x < screenMargin) {
        return false;
      }
      if (y < screenMargin) {
        return false;
      }
      if (x > (maxW - screenMargin)) {
        return false;
      }
      if (y > (maxH - screenMargin)) {
        return false;
      }
      return true;
    };
    // * Ассинхронная загрузка изображения, возвращает bitmap, когда загружен
    // * Пример использования loadImageAsync(a, b).then(метод)
    // в метод будет передан bitmap первым аргументом
    _.loadImageAsync = async function(folder, filename) {
      var promise;
      promise = new Promise(function(resolve, reject) {
        var b;
        b = ImageManager.loadBitmap("img/" + folder + "/", filename);
        return b.addLoadListener(function() {
          return resolve(b);
        });
      });
      return (await promise);
    };
    // * Преобразовать расширенное значение
    // * Значение может быть X -> X
    // * "X" -> X (цифра)
    // * "X,Y,Z,..." -> [X, Y, Z]
    // * "[X, Y, Z,...]" -> [X, Y, Z]
    // * "X|V" -> из переменной X
    // * [Y] -> случайное число из массива (рекурсивно)
    //@[2.8.1] since
    _.getEValue = function(value) {
      var e, items, randomValue, variableId;
      try {
        if (value == null) {
          return null;
        }
        if (KDCore.SDK.isString(value)) {
          if (isFinite(value)) { // * Число представленно строкой
            return Number(value);
          }
          // * Массив представлен строкой (может быть без квадратных скобок)
          if (value.contains(',') || (value.contains("[") && value.contains("]"))) {
            value = value.replace("[", "");
            value = value.replace("]", "");
            // * Преобразуем в число или строку (например если extended |V)
            items = value.split(",").map(function(item) {
              var itemT;
              itemT = item.trim();
              if (isFinite(itemT)) {
                return Number(itemT);
              } else {
                return itemT;
              }
            });
            // * Вызываем снова эту функцию, но уже с массивом
            return KDCore.Utils.getEValue(items);
          }
          if (value.contains("|V")) {
            variableId = parseInt(value);
            return $gameVariables.value(variableId);
          }
          return value; // * Просто значение в итоге
        } else if (KDCore.SDK.isArray(value)) {
          randomValue = value.sample();
          return KDCore.Utils.getEValue(randomValue);
        } else {
          return value;
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return value;
      }
    };
    //@[2.8.2] since
    _.isChanceIsGood = function(chance) {
      var e;
      try {
        if (chance > 1) {
          chance /= 100;
        }
        return chance > Math.random();
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return false;
      }
    };
    //@[2.8.2] since
    //KEY:w:3:1:50 , KEY:i:10:2:1|V
    //OUTPUT: [GameItem, COUNT]
    _.parseItemFromConditionStr = function(conditionLine) {
      var amount, e, itemChance, itemId, parts, typeId;
      try {
        if (!conditionLine.contains(":")) {
          return null;
        }
        parts = conditionLine.split(":");
        typeId = parts[1];
        itemId = KDCore.Utils.getEValue(parts[2]);
        amount = KDCore.Utils.getEValue(parts[3]);
        if (amount <= 0) {
          return null;
        }
        try {
          itemChance = String.any(parts[4]) ? parts[4] : 100;
          itemChance = KDCore.Utils.getEValue(itemChance) / 100;
        } catch (error) {
          e = error;
          KDCore.warning(e);
          itemChance = 0;
        }
        if (itemChance <= 0) {
          return null;
        }
        if (KDCore.Utils.isChanceIsGood(itemChance)) {
          return [KDCore.Utils.getItemByType(itemId, typeId), amount];
        } else {
          return null;
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return null;
      }
    };
    //@[3.2.1] since
    _.isValidCE = function(commonEventId) {
      var e;
      try {
        return commonEventId > 0 && ($dataCommonEvents[commonEventId] != null);
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return false;
      }
    };
    //@[3.2.1] since
    _.startCE = function(commonEventId) {
      var e;
      try {
        if (this.isValidCE(commonEventId)) {
          return $gameTemp.reserveCommonEvent(commonEventId);
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    //@[3.2.1] since
    _.checkSwitch = function(value) {
      if (value == null) {
        return false;
      }
      if (isFinite(value)) {
        return false;
      }
      return KDCore.SDK.checkSwitch(value);
    };
    //@[3.2.1] since
    // * Вызвать с задержкой в time миллисекунд
    // * Не забываем про bind
    _.callDelayed = function(method, time = 1) {
      var e;
      try {
        if (method == null) {
          return;
        }
        setTimeout((function() {
          var e;
          try {
            return method();
          } catch (error) {
            e = error;
            return KDCore.warning(e);
          }
        }), time);
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
    };
    //@[3.2.1] since
    //<meta:1,2,3,4> -> [1,2,3,4]
    _.getArrayOfNumbersFromMeta = function(symbol, obj) {
      var e, values;
      try {
        values = this.getArrayOfValuesFromMeta(symbol, obj);
        return values.map(function(v) {
          return Number(v);
        });
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return [];
      }
    };
    //@[3.2.1] since
    //<meta:a,b,c> -> ["a", "b", "c"]
    //<meta:a> -> ["a"]
    _.getArrayOfValuesFromMeta = function(symbol, obj) {
      var e, items, values;
      try {
        values = this.getValueFromMeta(symbol, obj);
        if (String.any(values)) {
          if (values.contains(',')) {
            items = values.split(',');
            return items || [];
          } else {
            return [values];
          }
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return [];
      }
    };
    //@[3.2.1] since
    // * Когда содержит одинаковый набор ключей
    //<meta:value1>
    //<meta:value2>
    //...
    // -> [value1,value2,...]
    _.getArrayOfValuesOfSameMeta = function(symbol, obj) {
      var e, j, len, line, lines, result;
      try {
        if (!this.hasMeta(symbol, obj)) {
          return [];
        }
        lines = obj.note.split("\n").filter(function(l) {
          return l.contains(symbol);
        });
        result = [];
        for (j = 0, len = lines.length; j < len; j++) {
          line = lines[j];
          try {
            line = line.replace("<" + symbol + ":", "");
            line = line.replace(">", "");
            result.push(line);
          } catch (error) {
            e = error;
            KDCore.warning(e);
          }
        }
        return result;
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return [];
    };
    //@[2.9.7] since
    // * Shrink number 100000 to "100k" and ect, returns STRING
    _.formatNumberToK = function(num) {
      var e;
      try {
        if (num >= 1000000000) {
          return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
        }
        if (num >= 1000000) {
          return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
        }
        if (num >= 1000) {
          return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
        }
        return num;
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return num;
      }
    };
  })();
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  return Window_Base.prototype.drawFaceWithCustomSize = function(faceName, faceIndex, x, y, finalSize) {
    this.contents._needModBltDWH = finalSize;
    this.drawFace(faceName, faceIndex, x, y);
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  return (function() {    // * Input Extension: KDGamepad
    //------------------------------------------------------------------------------
    // * Поддержка расширенного управления через геймпад (свой модуль)
    var ALIAS___updateGamepadState, _;
    //@[DEFINES]
    _ = Input;
    // * Активировать работу модуля KDGamepad
    _.activateExtendedKDGamepad = function() {
      return _._kdIsGamepadExtended = true;
    };
    //@[ALIAS]
    ALIAS___updateGamepadState = _._updateGamepadState;
    _._updateGamepadState = function(gamepad) {
      if (Input._kdIsGamepadExtended === true) {
        KDGamepad.update();
      }
      if ((typeof $gameTemp !== "undefined" && $gameTemp !== null ? $gameTemp.__kdgpStopDefaultGamepad : void 0) === true) {
        return;
      }
      // * Режим перемещения без DPad
      // * В оригинале игрок также ходит по DPad клавишам, что может быть не удобно
      // * например при работе с инвентарём
      if (KDGamepad.isNoDPadMoving()) {
        if (KDGamepad.isDPadAny()) {
          Input.clear();
          return;
        }
      }
      ALIAS___updateGamepadState.call(this, gamepad);
    };
    window.KDGamepad = function() {
      return new Error("This is static class");
    };
    window.addEventListener("gamepadconnected", function(event) {
      var e;
      try {
        return KDGamepad.refresh();
      } catch (error) {
        // * Можно напрямую
        //unless KDGamepad.isExists()
        //    if event.gamepad? and event.gamepad.mapping == 'standard'
        //        KDGamepad.init(event.gamepad)
        e = error;
        KDCore.warning(e);
        return KDGamepad.stop();
      }
    });
    window.addEventListener("gamepaddisconnected", function(event) {
      var e;
      if (!KDGamepad.isExists()) {
        return;
      }
      try {
        if ((event.gamepad != null) && event.gamepad === KDGamepad.gamepad) {
          return KDGamepad.stop();
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return KDGamepad.stop();
      }
    });
    KDGamepad.stopDefaultGamepad = function() {
      $gameTemp.__kdgpStopDefaultGamepad = true;
    };
    KDGamepad.resumeDefaultGamepad = function() {
      $gameTemp.__kdgpStopDefaultGamepad = null;
    };
    // * Ссылка на геймпад
    KDGamepad.gamepad = null;
    // * Подключён ли Gamepad ?
    KDGamepad.isExists = function() {
      return KDGamepad.gamepad != null;
    };
    // * Инициализация состояния кнопок
    // * Этот метод вызывается автоматически из Refresh или при подключении Gamepad
    KDGamepad.init = function(gamepad) {
      KDGamepad.gamepad = gamepad;
      this._isActive = true;
      this.buttonNames = [
        'A', // 0
        'B', // 1
        'X', // 2
        'Y', // 3
        'LB', // 4
        'RB', // 5
        'LTrigger', // 6
        'RTrigger', // 7
        'Back', // 8
        'Start', // 9
        'LStick', // 10
        'RStick', // 11
        'dUp', // 12
        'dDown', // 13
        'dLeft', // 14
        'dRight' // 15
      ];
      this.reset();
    };
    // * Аналог Input.clear
    KDGamepad.clear = function() {
      return KDGamepad.reset();
    };
    // * Сбросить состояние кнопок
    KDGamepad.reset = function() {
      this.leftStick = {
        x: 0,
        y: 0
      };
      this.rightStick = {
        x: 0,
        y: 0
      };
      this.buttons = {};
      this.buttonsPressed = {};
      this.prevButtons = {};
    };
    
    // * Остановить учёт геймпада
    KDGamepad.stop = function() {
      KDGamepad.reset();
      KDGamepad.gamepad = null;
    };
    // * Функция проверки что нажата кнопка на геймпаде
    KDGamepad._buttonPressed = function(gamepad, index) {
      var b, e;
      try {
        if (!gamepad || !gamepad.buttons || index >= gamepad.buttons.length) {
          return false;
        }
        b = gamepad.buttons[index];
        if (b == null) {
          return false;
        }
        if (typeof b === 'object') {
          // * Можно упростить
          return b.pressed;
        }
        return b === 1.0;
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return false;
      }
    };
    // * Каждый кадр (обновление состояний)
    KDGamepad.update = function() {
      var e, gp, i, isDown, j, len, name, ref;
      if (!KDGamepad.isActive()) {
        return;
      }
      KDGamepad.refresh();
      if (!KDGamepad.isExists()) {
        return;
      }
      try {
        gp = KDGamepad.gamepad;
        ref = this.buttonNames;
        // * Проверка состояний кнопок
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          name = ref[i];
          this.buttons[name] = false;
          isDown = KDGamepad._buttonPressed(gp, i);
          if (isDown === true) {
            this.prevButtons[name] = true;
          } else {
            // * Срабатываение только при нажал - отпустил
            if (this.prevButtons[name] === true) {
              this.buttons[name] = true;
              this.prevButtons[name] = false;
            }
          }
        }
        // * Проверка стиков
        this.leftStick.x = gp.axes[0];
        this.leftStick.y = gp.axes[1];
        this.rightStick.x = gp.axes[2];
        this.rightStick.y = gp.axes[3];
      } catch (error) {
        e = error;
        KDCore.warning(e);
        KDGamepad.stop();
      }
    };
    // * Обновить и проверить состояние Gamepad
    // * Надо каждый раз это вызывать
    KDGamepad.refresh = function() {
      var e, gamepads, gp, i, isGamepadRefreshed, j, ref;
      try {
        isGamepadRefreshed = false;
        if (navigator.getGamepads) {
          gamepads = navigator.getGamepads();
        } else if (navigator.webkitGetGamepads) {
          gamepads = navigator.webkitGetGamepads();
        }
        if (gamepads != null) {
          for (i = j = 0, ref = gamepads.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
            gp = gamepads[i];
            if ((gp != null) && gp.mapping === 'standard') {
              isGamepadRefreshed = true;
              if (KDGamepad.buttonNames != null) {
                KDGamepad.gamepad = gp;
              } else {
                KDGamepad.init(gp);
              }
              break;
            }
          }
        }
        if (!isGamepadRefreshed) {
          // * Если не был найден не один gamepad - отключаем систему
          KDGamepad.stop();
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
        KDGamepad.stop();
      }
    };
    // * Любое нажатие кнопки
    KDGamepad.isKeyAny = function(name) {
      return KDGamepad.isKey(name) || KDGamepad.isKeyPressed(name);
    };
    // * Нажата ли кнопка (trigger нажал - отпустил)
    KDGamepad.isKey = function(name) {
      if (!KDGamepad.isExists()) {
        return false;
      }
      if (this.buttons == null) {
        return false;
      }
      return this.buttons[name] === true;
    };
    // * Нажата ли кнопка (continues зажата)
    KDGamepad.isKeyPressed = function(name) {
      if (!KDGamepad.isExists()) {
        return false;
      }
      if (this.buttons == null) {
        return false;
      }
      return this.prevButtons[name] === true;
    };
    KDGamepad.isDPadAny = function() {
      return KDGamepad.isKeyAny("dLeft") || KDGamepad.isKeyAny("dRight") || KDGamepad.isKeyAny("dUp") || KDGamepad.isKeyAny("dDown");
    };
    KDGamepad.isActive = function() {
      return this._isActive === true;
    };
    // * Временно отключить обработку KDGamepad
    KDGamepad.setActive = function(_isActive) {
      this._isActive = _isActive;
      if (KDGamepad.isActive()) {
        KDGamepad.refresh();
      } else {
        KDGamepad.stop();
      }
    };
    // * Отключить перемещение игрока на DPad
    KDGamepad.setNoDPadMovingMode = function(_noDpadMoving) {
      this._noDpadMoving = _noDpadMoving;
    };
    return KDGamepad.isNoDPadMoving = function() {
      return this._noDpadMoving === true;
    };
  })();
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var BitmapSrc;
  BitmapSrc = (function() {
    //?[DEPRECATED]
    class BitmapSrc {
      constructor() {
        this.bitmap = null;
      }

      static LoadFromIconIndex(iconIndex) {
        var bs, icon_bitmap, iconset, ph, pw, sx, sy;
        bs = new BitmapSrc();
        if (BitmapSrc.CACHE[iconIndex] == null) {
          iconset = ImageManager.loadSystem('IconSet');
          if (KDCore.isMV()) {
            pw = Window_Base._iconWidth;
            ph = Window_Base._iconHeight;
          } else {
            pw = ImageManager.iconWidth;
            ph = ImageManager.iconHeight;
          }
          sx = iconIndex % 16 * pw;
          sy = Math.floor(iconIndex / 16) * ph;
          icon_bitmap = new Bitmap(pw, ph);
          icon_bitmap.addLoadListener(function() {
            icon_bitmap.blt(iconset, sx, sy, pw, ph, 0, 0);
          });
          BitmapSrc.CACHE[iconIndex] = icon_bitmap;
        }
        bs.bitmap = BitmapSrc.CACHE[iconIndex];
        return bs;
      }

      static LoadFromImageFolder(filename) {
        var bs;
        bs = new BitmapSrc();
        bs.bitmap = ImageManager.loadPicture(filename);
        return bs;
      }

      static LoadFromBase64(data, name) {
        var bs;
        bs = new BitmapSrc();
        if (name != null) {
          if (BitmapSrc.CACHE[name] != null) {
            bs.bitmap = BitmapSrc.CACHE[name];
          } else {
            BitmapSrc.CACHE[name] = Bitmap.load(data);
            bs.bitmap = BitmapSrc.CACHE[name];
          }
        } else {
          bs.bitmap = Bitmap.load(data);
        }
        return bs;
      }

      static LoadFromMemory(symbol) {
        var bs;
        bs = new BitmapSrc();
        if (BitmapSrc.CACHE[symbol] != null) {
          bs.bitmap = BitmapSrc.CACHE[symbol];
        } else {
          bs.bitmap = ImageManager.loadEmptyBitmap();
        }
        return bs;
      }

    };

    BitmapSrc.CACHE = {};

    return BitmapSrc;

  }).call(this);
  //@[EXTEND]
  return KDCore.BitmapSrc = BitmapSrc;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Changer;
  // * Класс который может плавно изменять какой-либо параметр
  // * Работает в стиле chain методов

    // * ------------------ ПРИМЕР ----------------------------------

    // * Меняем прозрачность 4 раза, туда-сюда, затем выводим done в консоль

    //@changer = new AA.Changer(someSprite)
  //@changer.change('opacity').from(255)
  //            .to(0).step(5).speed(1).delay(30).repeat(4).reverse()
  //            .start().done(() -> console.log('done'))
  //@changer.update()

    // * -------------------------------------------------------------
  Changer = class Changer {
    constructor(obj) {
      this.obj = obj;
      // * Количество кадров, в которые будет обновление
      this._field = null; // * название поля
      this._speed = 1; // * frames
      this._step = 1; // * шаг изменения значения
      this._from = 0; // * Начальное значение
      this._to = 0; // * Конечное значение
      this._thread = null;
      this._orienation = true; // * Направление + или - step (true = +)
      this._delay = 0; // * Задержка старта
      this._changer = null; // * Ссылка на следующий changer
      this._isRepeat = false; // * Надо ли поторить себя снова
      this._onDoneMethod = null; // * Метод будет выполнен в конце (при завершении)
      this._isPrepared = false; // * Элемента был подготовлен (установлено значение from)
    }

    start() {
      if (this._field == null) {
        return;
      }
      if (this._from === this._to) {
        return;
      }
      if (this._delay > 0) {
        this._delayThread = new KDCore.TimedUpdate(this._delay, this._startThread.bind(this));
        this._delayThread.once();
      } else {
        this._startThread();
      }
      return this;
    }

    isStarted() {
      return (this._thread != null) || (this._delayThread != null);
    }

    from(_from) {
      this._from = _from;
      return this;
    }

    to(_to) {
      this._to = _to;
      return this;
    }

    step(_step) {
      this._step = _step;
      return this;
    }

    speed(_speed) {
      this._speed = _speed;
      return this;
    }

    change(_field) {
      this._field = _field;
      return this;
    }

    // * Снова повторить (не совместим с then)
    // * Если ничего не указать, или <= 0 -> то бескончно
    repeat(_repeatCount = 0) {
      this._repeatCount = _repeatCount;
      if (this._repeatCount <= 0) {
        this._repeatCount = null;
      }
      this._isRepeat = true;
      this._changer = null;
      return this;
    }

    // * Снова повторить, но поменять местами to и from (работает только с repeat >= 2)
    reverse() {
      this._isReverse = true;
      return this;
    }

    isDone() {
      if (!this._isPrepared) {
        // * Чтобы не было выхода пока ждёт Delay
        return false;
      }
      // * Если от 255 до 0 (например)
      if (this._orienation === false) {
        // * То может быть меньше нуля (т.к. @step динамический)
        return this.value() <= this._to;
      } else {
        return this.value() >= this._to;
      }
    }

    value() {
      return this.obj[this._field];
    }

    stop() {
      this._thread = null;
      this._delayThread = null;
      if (this._changer == null) {
        // * Если есть связанный Changer, то не выполняем метод завршения
        return this._callDoneMethod();
      }
    }

    // * При ожидании, значения устанавливаются не сразу
    delay(_delay) {
      this._delay = _delay;
      return this;
    }

    // * Выполнить другой Changer после этого
    // * Не совместим с Repeat
    // * НЕЛЬЗЯ зацикливать, не будет работать
    // * Соединённый не надо обновлять вне, он обновляется в этом
    then(_changer) {
      this._changer = _changer;
      this._isRepeat = false;
      return this;
    }

    // * Этот метод будт выполнене в конце
    done(_onDoneMethod) {
      this._onDoneMethod = _onDoneMethod;
      return this;
    }

    // * Шаг можно выполнить и в ручную
    makeStep() {
      if (!this.isStarted()) {
        this._prepare();
      }
      this._makeStep();
      return this;
    }

    update() {
      var ref;
      if (this.isStarted()) {
        if (this._delay > 0) {
          if ((ref = this._delayThread) != null) {
            ref.update();
          }
        }
        if (this._thread != null) {
          this._updateMainThread();
        }
      } else {
        // * Если хоть раз был запущен
        if (this._isBeenStarted === true) {
          if (this._changer != null) {
            this._updateChainedChanger();
          }
        }
      }
    }

    static CreateForOpacityUp(sprite, step = 35, onDone = null, isAutoStart = true) {
      var changer;
      changer = new Changer(sprite);
      changer.change('opacity').from(0).to(255).step(step);
      changer.done(function() {
        sprite.opacity = 255;
        if (onDone != null) {
          return onDone();
        }
      });
      if (isAutoStart) {
        changer.start();
      }
      return changer;
    }

    static CreateForOpacityDown(sprite, step = 35, onDone = null, isAutoStart = true) {
      var changer;
      changer = new Changer(sprite);
      changer.change('opacity').from(sprite.opacity).to(0).step(step);
      changer.done(function() {
        sprite.opacity = 0;
        if (onDone != null) {
          return onDone();
        }
      });
      if (isAutoStart) {
        changer.start();
      }
      return changer;
    }

  };
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Changer.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = Changer.prototype;
    _._prepare = function() {
      if (this._field == null) {
        return;
      }
      this._orienation = this._from < this._to;
      if (!this._orienation) {
        this._step *= -1;
      }
      // * Устанавливаем начальное значение
      this.obj[this._field] = this._from;
      this._isPrepared = true;
    };
    _._makeStep = function() {
      var value;
      if (this.isDone()) {
        return;
      }
      value = this.value();
      value += this._step;
      this.obj[this._field] = value;
    };
    _._startThread = function() {
      this._prepare();
      if (this.isDone()) {
        return;
      }
      this._thread = new KDCore.TimedUpdate(this._speed, this._makeStep.bind(this));
      return this._isBeenStarted = true;
    };
    _._updateChainedChanger = function() {
      if (this._changer.isStarted()) {
        this._changer.update();
        if (this._changer.isDone()) {
          this._callDoneMethod();
          this._changer.stop();
          return this._changer = null;
        }
      } else {
        return this._changer.start();
      }
    };
    _._restart = function() {
      if (!this._isCanRepeatMore()) {
        return;
      }
      if (this._repeatCount == null) {
        // * Если указано! число повторений, то onDone метод не вызываем
        this._callDoneMethod();
      }
      if (this._isReverse === true) {
        this._swapFromTo();
      }
      this._prepare();
      return this.start();
    };
    _._swapFromTo = function() {
      var t;
      t = this._from;
      this._from = this._to;
      this._to = t;
      // * Инвентируем число step
      this._step *= -1;
    };
    _._callDoneMethod = function() {
      if (this._onDoneMethod != null) {
        return this._onDoneMethod();
      }
    };
    _._isCanRepeatMore = function() {
      if (this._repeatCount == null) {
        return true;
      }
      this._repeatCount--;
      if (this._repeatCount <= 0) {
        this.stop();
        return false;
      }
      return true;
    };
    _._updateMainThread = function() {
      this._thread.update();
      if (this.isDone()) {
        if (this._isRepeat === true) {
          this._restart();
        } else {
          if (this._changer != null) {
            this._updateChainedChanger();
          }
          this.stop();
        }
      }
    };
  })();
  // ■ END Changer.coffee
  //---------------------------------------------------------------------------

  //@[EXTEND]
  return KDCore.Changer = Changer;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Color;
  Color = (function() {
    class Color {
      constructor(r1 = 255, g1 = 255, b1 = 255, a1 = 255) {
        this.r = r1;
        this.g = g1;
        this.b = b1;
        this.a = a1;
      }

      getLightestColor(lightLevel) {
        var bf, newColor, p;
        bf = 0.3 * this.R + 0.59 * this.G + 0.11 * this.B;
        p = 0;
        newColor = [0, 0, 0, 0];
        if (bf - lightLevel >= 0) {
          if (bf >= 0) {
            p = Math.abs(bf - lightLevel) / lightLevel;
          }
          newColor = this.ARR.map(function(c) {
            return c - (p * c);
          });
        } else {
          if (bf >= 0) {
            p = (lightLevel - bf) / (255 - bf);
          }
          newColor = this.ARR.map(function(c) {
            return [(255 - c) * p + c, 255].min();
          });
        }
        return new Color(newColor[0], newColor[1], newColor[2], newColor[3]);
      }

      clone() {
        return this.reAlpha(this.a);
      }

      reAlpha(newAlpha) {
        return new Color(this.r, this.g, this.b, newAlpha || 255);
      }

      static AddConstantColor(name, color) {
        color.toHex();
        color.toArray();
        color.toCSS();
        KDCore.SDK.setConstantToObject(Color, name, color);
      }

      toHex() {
        var b, g, r;
        if (this._colorHex != null) {
          return this._colorHex;
        }
        r = Math.floor(this.r).toString(16).padZero(2);
        g = Math.floor(this.g).toString(16).padZero(2);
        b = Math.floor(this.b).toString(16).padZero(2);
        return this._colorHex = '#' + r + g + b;
      }

      toArray() {
        if (this._colorArray != null) {
          return this._colorArray;
        }
        return this._colorArray = [this.r, this.g, this.b, this.a];
      }

      toCSS() {
        var na, nb, ng, nr;
        if (this._colorCss != null) {
          return this._colorCss;
        }
        nr = Math.round(this.r);
        ng = Math.round(this.g);
        nb = Math.round(this.b);
        na = this.a / 255;
        return this._colorCss = `rgba(${nr},${ng},${nb},${na})`;
      }

      toNumber() {
        return Number(this.toHex().replace("#", "0x"));
      }

      static Random() {
        var a, b, c;
        a = KDCore.SDK.rand(1, 254);
        b = KDCore.SDK.rand(1, 254);
        c = KDCore.SDK.rand(1, 254);
        return new Color(a, b, c, 255);
      }

      static FromHex(hexString) {
        var color, result;
        result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexString);
        color = null;
        if (result != null) {
          color = {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
          };
        }
        if (color != null) {
          return new Color(color.r, color.g, color.b, 255);
        } else {
          return Color.NONE;
        }
      }

    };

    Object.defineProperties(Color.prototype, {
      R: {
        get: function() {
          return this.r;
        },
        configurable: true
      },
      G: {
        get: function() {
          return this.g;
        },
        configurable: true
      },
      B: {
        get: function() {
          return this.b;
        },
        configurable: true
      },
      A: {
        get: function() {
          return this.a;
        },
        configurable: true
      },
      ARR: {
        get: function() {
          return this.toArray();
        },
        configurable: true
      },
      CSS: {
        get: function() {
          return this.toCSS();
        },
        configurable: true
      },
      HEX: {
        get: function() {
          return this.toHex();
        },
        configurable: true
      },
      OX: {
        get: function() {
          return this.toNumber();
        },
        configurable: true
      }
    });

    Color.AddConstantColor('NONE', new Color(0, 0, 0, 0));

    Color.AddConstantColor('BLACK', new Color(0, 0, 0, 255));

    Color.AddConstantColor('WHITE', new Color(255, 255, 255, 255));

    Color.AddConstantColor('RED', new Color(255, 0, 0, 255));

    Color.AddConstantColor('GREEN', new Color(0, 255, 0, 255));

    Color.AddConstantColor('BLUE', new Color(0, 0, 255, 255));

    Color.AddConstantColor('AQUA', new Color(128, 255, 255, 255));

    Color.AddConstantColor('MAGENTA', new Color(128, 0, 128, 255));

    Color.AddConstantColor('YELLOW', new Color(255, 255, 0, 255));

    Color.AddConstantColor('ORANGE', new Color(255, 128, 0, 255));

    return Color;

  }).call(this);
  //@[EXTEND]
  return KDCore.Color = Color;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Color, DevLog, __TMP_LOGS__;
  Color = KDCore.Color;
  __TMP_LOGS__ = [];
  DevLog = class DevLog {
    constructor(prefix = "") {
      this.prefix = prefix;
      this._isShow = typeof DEV !== 'undefined';
      this._color = Color.BLACK;
      this._backColor = Color.WHITE;
      __TMP_LOGS__.push(this);
    }

    on() {
      this._isShow = true;
      return this;
    }

    off() {
      this._isShow = false;
      return this;
    }

    applyRandomColors() {
      this.applyRandomWithoutBackgroundColors();
      this.setBackColor(Color.Random());
      return this;
    }

    applyRandomWithoutBackgroundColors() {
      this.setColor(Color.Random());
      return this;
    }

    setColor(color) {
      this._color = color;
      return this;
    }

    setBackColor(backColor) {
      this._backColor = backColor;
      return this;
    }

    applyLibraryColors() {
      this.setColors(new Color(22, 120, 138, 0), Color.BLACK);
      return this;
    }

    setColors(color, backColor) {
      this.setColor(color);
      this.setBackColor(backColor);
      return this;
    }

    applyExtensionColors() {
      this.setColors(new Color(22, 143, 137, 0), Color.BLACK.getLightestColor(60));
      return this;
    }

    applyWarningColors() {
      this.setColors(Color.ORANGE, Color.BLACK.getLightestColor(100));
      return this;
    }

    p(text) {
      if (!this._isShow) {
        return;
      }
      if (text == null) {
        console.log("");
      }
      this._printText(text);
    }

    _printText(text) {
      text = this.prefix + " : " + text;
      if (this._isUsingColor()) {
        return this._printTextWithColors(text);
      } else {
        return console.log(text);
      }
    }

    _isUsingColor() {
      return this._color !== Color.BLACK || this._backColor !== Color.WHITE;
    }

    _printTextWithColors(text) {
      var args;
      args = ['%c' + text, `color: ${this._color.HEX} ; background: ${this._backColor.HEX};`];
      return window.console.log.apply(console, args);
    }

    static CreateForLib(library) {
      var dlog;
      dlog = new DevLog(library.name);
      dlog.applyLibraryColors();
      return dlog;
    }

    static EnableAllLogs() {
      return __TMP_LOGS__.forEach(function(log) {
        return log.on();
      });
    }

  };
  //@[EXTEND]
  return KDCore.DevLog = DevLog;
});


// Generated by CoffeeScript 2.6.1
// * Класс для глобального события игры (НЕ события на карте)
KDCore.registerLibraryToLoad(function() {
  //@[AUTO EXTEND]
  return KDCore.GEvent = class GEvent {
    constructor(name) {
      this.name = name;
      this.clear();
    }

    addListener(listener, isSingle = false) {
      if (listener == null) {
        return;
      }
      if (isSingle === true) {
        this.listeners = [listener];
      } else {
        this.listeners.push(listener);
      }
    }

    removeListener(listener) {
      if (listener == null) {
        return;
      }
      return this.listener.delete(listener);
    }

    call() {
      var i, l, len, ref;
      ref = this.listeners;
      for (i = 0, len = ref.length; i < len; i++) {
        l = ref[i];
        l();
      }
    }

    clear() {
      return this.listeners = [];
    }

  };
});


// Generated by CoffeeScript 2.6.1
// * Менеджер для управления глобальными событиями игры (GEvent) (НЕ события на карте)
KDCore.registerLibraryToLoad(function() {
  var GEventsManager;
  // * Данный менеджер глобальный, т.е. с ним работают ВСЕ плагины, которые его используют!
  GEventsManager = function() {};
  (function() {
    var _;
    _ = GEventsManager;
    // * Существует ли событие с данным именем
    _.isEventExists = function(gEventName) {
      return this._getEventByName(gEventName) != null;
    };
    // * Получить список всех зарегестрированных событий (имён)
    _.getAllEvents = function() {
      if (this.events == null) {
        return [];
      }
      return this.events.map(function(ev) {
        return ev.name;
      });
    };
    // * Зарегестрировать событие (используется только имя события)
    _.register = function(gEventName) {
      if (this.events == null) {
        this.events = [];
      }
      this.events.push(new KDCore.GEvent(gEventName));
    };
    // * Подписаться на событие (имя события) и слушатель
    // * если isSingle == true - то у события может быть только один исполнитель
    _.subscribeFor = function(evName, listener, isSingle = false) {
      var ref;
      return (ref = this._getEventByName(evName)) != null ? ref.addListener(listener, isSingle) : void 0;
    };
    // * Подписаться на событие (уникально) для объекта
    // * Т.е. при вызове этого метода ещё раз, если объект
    // * уже подписан на событие, ничего не будет (без дубликатов)
    //? ВНИМАНИЕ ! Если объект подписался через subscribeForX, то
    // выполнив clear по данному evName, он уже не подпишится!
    _.subscribeForX = function(context, evName, listener) {
      var e, key;
      try {
        key = "__kdCoreGEvent_" + evName;
        if (context[key] == null) {
          this.subscribeFor(evName, listener);
          return context[key] = true;
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    // * Вызвать событие (по имени)
    _.call = function(evName) {
      var ref;
      return (ref = this._getEventByName(evName)) != null ? ref.call() : void 0;
    };
    _.clear = function(evName) {
      var ref;
      return (ref = this._getEventByName(evName)) != null ? ref.clear() : void 0;
    };
    _._getEventByName = function(name) {
      if (!this.events) {
        return null;
      }
      return this.events.find(function(ev) {
        return ev.name === name;
      });
    };
  })();
  //@[EXTEND]
  return KDCore.GEventsManager = GEventsManager;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  //@[AUTO EXTEND]
  //?[DEPRECATED]
  return KDCore.ParametersManager = class ParametersManager {
    constructor(pluginName) {
      this.pluginName = pluginName;
      this._cache = {};
      this._parameters = PluginManager.getPluginParametersByRoot(this.pluginName);
    }

    isLoaded() {
      return (this._parameters != null) && this._parameters.hasOwnProperty(this.pluginName);
    }

    isHasParameter(name) {
      return this._parameters[name] != null;
    }

    getString(name) {
      return this._parameters[name];
    }

    convertField(object, fieldName) {
      var e;
      try {
        object[fieldName] = JSON.parse(object[fieldName] || 'false');
      } catch (error) {
        e = error;
        console.error('Error while convert field ' + e.name);
        object[fieldName] = false;
      }
      return object;
    }

    convertImage(object, fieldName) {
      return object[fieldName] = this.loadImage(object[fieldName]);
    }

    loadImage(filename, smooth) {
      var e, path;
      try {
        if (filename) {
          path = filename.split('/');
          filename = path.last();
          path = path.first() + '/';
          return ImageManager.loadBitmap('img/' + path, filename, 0, smooth || true);
        } else {
          return ImageManager.loadEmptyBitmap();
        }
      } catch (error) {
        e = error;
        console.error(e);
        return ImageManager.loadEmptyBitmap();
      }
    }

    getFromCacheOrInit(name, func) {
      var object;
      if (!this.isInCache(name)) {
        if (func != null) {
          object = func.call(this);
          this.putInCache(name, object);
        }
      }
      return this.getFromCache(name);
    }

    isInCache(name) {
      return this._cache.hasOwnProperty(name);
    }

    putInCache(name, object) {
      return this._cache[name] = object;
    }

    getFromCache(name) {
      return this._cache[name];
    }

    getNumber(name) {
      var number;
      number = this.getObject(name);
      if (KDCore.SDK.isInt(number)) {
        return number;
      }
      return 0;
    }

    getObject(name) {
      if (this.isHasParameter(name)) {
        return JSON.parse(this.getString(name) || '{}');
      } else {
        return {};
      }
    }

    getBoolean(name) {
      if (this.isHasParameter(name)) {
        return JSON.parse(this.getString(name) || false);
      } else {
        return false;
      }
    }

    getBooleanFromCacheWithDefault(name, defaultValue) {
      if (this.isHasParameter(name)) {
        return this.getBooleanFromCache(name);
      } else {
        return defaultValue;
      }
    }

    getNumberFromCacheWithDefault(name, defaultValue) {
      if (this.isHasParameter(name)) {
        return this.getNumberFromCache(name);
      } else {
        return defaultValue;
      }
    }

    getStringFromCacheWithDefault(name, defaultValue) {
      if (this.isHasParameter(name)) {
        return this.getStringFromCache(name);
      } else {
        return defaultValue;
      }
    }

    getBooleanFromCache(name) {
      return this.getFromCacheOrInit(name, function() {
        return this.getBoolean(name);
      });
    }

    getNumberFromCache(name) {
      return this.getFromCacheOrInit(name, function() {
        return this.getNumber(name);
      });
    }

    getStringFromCache(name) {
      return this.getFromCacheOrInit(name, function() {
        return this.getString(name);
      });
    }

  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  //@[AUTO EXTEND]
  return KDCore.ParamLoader = class ParamLoader {
    constructor(pluginName) {
      this.pluginName = pluginName;
      this.paramsRaw = PluginManager.getPluginParametersByRoot(this.pluginName);
      this.params = this.parseParameters(this.paramsRaw);
    }

    parseParameters(paramSet) {
      var clearKey, key, params, typeKey, value;
      params = {};
      for (key in paramSet) {
        value = paramSet[key];
        clearKey = this.parseKey(key);
        typeKey = this.parseKeyType(key);
        params[clearKey] = this.parseParamItem(typeKey, value);
      }
      return params;
    }

    parseKey(keyRaw) {
      return keyRaw.split(":")[0];
    }

    parseKeyType(keyRaw) {
      return keyRaw.split(":")[1];
    }

    // * Проверка, загружены ли параметры плагина
    isLoaded() {
      return (this.paramsRaw != null) && this.paramsRaw.hasOwnProperty(this.pluginName);
    }

    // * Имя параметра без ключа
    isHasParameter(paramName) {
      return this.params[paramName] != null;
    }

    
      // * Возвращает значение параметра (def - по умолчанию, если не найден)
    getParam(paramName, def) {
      var value;
      if (this.isHasParameter(paramName)) {
        value = this.params[paramName];
        if (value != null) {
          return value;
        }
      }
      return def;
    }

    // * Данные ключи должны идти после названия параметра через :
    // * Пример: @param ShowDelay:int, @param TestBool:bool
    // * Текстовые параметры, которые надо вернуть как есть, можно без типа (text, file, combo, ...)
    parseParamItem(type, item) {
      var e;
      if (type == null) {
        return item;
      }
      try {
        switch (type) {
          case "int":
          case "i":
            return Number(item);
          case "intA":
            return this.parseArray(item, "int");
          case "bool":
          case "b":
          case "e":
            return eval(item);
          case "struct":
          case "s":
            return this.parseStruct(item);
          case "structA":
            return this.parseStructArray(item);
          case "str":
            return item;
          case "strA":
            return this.parseArray(item, "str");
          case "note":
            return this.parseNote(item);
          case "css":
            return item.toCss();
          case "color":
            return KDCore.Color.FromHex(item);
          case "json":
          case "j":
            return this.parseJson(item);
          case "jA":
            return this.parseArray(item, 'json');
          default:
            return item;
        }
      } catch (error) {
        e = error;
        console.warn(e);
        return item;
      }
    }

    parseArray(items, type) {
      var e, elements, i, len, p, parsed;
      try {
        elements = [];
        parsed = JsonEx.parse(items);
        for (i = 0, len = parsed.length; i < len; i++) {
          p = parsed[i];
          try {
            elements.push(this.parseParamItem(type, p));
          } catch (error) {
            e = error;
            console.warn(e);
          }
        }
      } catch (error) {
        e = error;
        console.warn(e);
      }
      return elements;
    }

    parseStruct(item) {
      var e, parsed;
      try {
        if (item == null) {
          return null;
        }
        if (!String.any(item)) {
          return null;
        }
        parsed = JsonEx.parse(item);
        if (parsed != null) {
          return this.parseParameters(parsed);
        }
      } catch (error) {
        e = error;
        console.warn(e);
      }
      return null;
    }

    parseStructArray(items) {
      var e, elements, i, len, p, parsed;
      try {
        elements = [];
        parsed = JsonEx.parse(items);
        for (i = 0, len = parsed.length; i < len; i++) {
          p = parsed[i];
          try {
            elements.push(this.parseStruct(p));
          } catch (error) {
            e = error;
            console.warn(e);
          }
        }
      } catch (error) {
        e = error;
        console.warn(e);
      }
      return elements;
    }

    parseNote(item) {
      var e, parsed;
      try {
        parsed = JsonEx.parse(item);
        if (parsed != null) {
          return parsed;
        }
      } catch (error) {
        e = error;
        console.warn(e);
      }
      return item;
    }

    parseJson(item) {
      var cx, e, element, elements, i, json, key, len, parsed, value;
      try {
        json = {};
        parsed = JsonEx.parse(item);
        elements = parsed.split('\n');
        for (i = 0, len = elements.length; i < len; i++) {
          element = elements[i];
          cx = "{" + element + "}";
          try {
            item = JsonEx.parse(cx);
            for (key in item) {
              value = item[key];
              json[key] = value;
            }
          } catch (error) {
            e = error;
            KDCore.warning("Parameter " + element + " have syntax errors, ignored");
          }
        }
        return json;
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return null; // * Чтобы default value был возвращён
      }
    }

  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Point;
  Point = (function() {
    class Point {
      constructor(_x = 0, _y = 0) {
        this._x = _x;
        this._y = _y;
      }

      clone() {
        return new Point(this._x, this._y);
      }

      toString() {
        return "[" + this._x + " ; " + this._y + "]";
      }

      isSame(anotherPoint) {
        return this.x === anotherPoint.x && this.y === anotherPoint.y;
      }

      convertToCanvas() {
        return new Point(Graphics.pageToCanvasX(this._x), Graphics.pageToCanvasY(this._y));
      }

      convertToMap() {
        return new Point($gameMap.canvasToMapX(this._x), $gameMap.canvasToMapY(this._y));
      }

      convertToScreen() {
        return new Point(this.screenX(), this.screenY());
      }

      screenX() {
        var t, tw;
        t = $gameMap.adjustX(this._x);
        tw = $gameMap.tileWidth();
        return Math.round(t * tw + tw / 2);
      }

      screenY() {
        var t, th;
        t = $gameMap.adjustY(this._y);
        th = $gameMap.tileHeight();
        return Math.round(t * th + th);
      }

      round() {
        return new Point(Math.round(this._x), Math.round(this._y));
      }

      floor() {
        return new Point(Math.floor(this._x), Math.floor(this._y));
      }

      mapPointOnScreen() {
        var nx, ny;
        nx = (this._x * $gameMap.tileWidth()) - ($gameMap.displayX() * $gameMap.tileWidth());
        ny = (this._y * $gameMap.tileHeight()) - ($gameMap.displayY() * $gameMap.tileHeight());
        return new Point(nx, ny);
      }

      multiplyBy(val) {
        return new Point(this._x * val, this._y * val);
      }

      simple() {
        return new PIXI.Point(this.x, this.y);
      }

      delta(point) {
        var dx, dy;
        dx = point.x - this._x;
        dy = point.y - this._y;
        return new KDCore.Point(dx, dy);
      }

      static _getEmpty() {
        if (Point._emptyPoint == null) {
          Point._emptyPoint = new Point(0, 0);
        }
        return Point._emptyPoint;
      }

    };

    Object.defineProperties(Point.prototype, {
      x: {
        get: function() {
          return this._x;
        },
        configurable: true
      },
      y: {
        get: function() {
          return this._y;
        },
        configurable: true
      }
    });

    Object.defineProperties(Point, {
      Empty: {
        get: function() {
          return Point._getEmpty();
        },
        configurable: false
      }
    });

    Array.prototype.toPoint = function() {
      return new Point(this[0], this[1]);
    };

    Object.defineProperty(Array.prototype, "toPoint", {
      enumerable: false
    });

    Sprite.prototype.toPoint = function() {
      return new Point(this.x, this.y);
    };

    Game_CharacterBase.prototype.toPoint = function() {
      return new Point(this.x, this.y);
    };

    return Point;

  }).call(this);
  //@[EXTEND]
  return KDCore.Point = Point;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  return KDCore.Sprite = (function(superClass) {
    //@[AUTO EXTEND]
    class Sprite extends superClass {
      constructor() {
        super(...arguments);
      }

      appear(step, delay = 0) {
        this.opacity = 0;
        this._opChanger = KDCore.Changer.CreateForOpacityUp(this, step, () => {
          this._opChanger = null;
          return this._updateOpChanger = function() {}; // * EMPTY
        }, false); // * Not autostart for Delay
        if (delay > 0) {
          this._opChanger.delay(delay);
        }
        this._opChanger.start();
        this._updateOpChanger = () => {
          var ref;
          return (ref = this._opChanger) != null ? ref.update() : void 0;
        };
      }

      disapper(step, delay = 0) {
        this._opChanger = KDCore.Changer.CreateForOpacityDown(this, step, () => {
          this._opChanger = null;
          return this._updateOpChanger = function() {}; // * EMPTY
        }, false); // * Not autostart for Delay
        if (delay > 0) {
          this._opChanger.delay(delay);
        }
        this._opChanger.start();
        this._updateOpChanger = () => {
          var ref;
          return (ref = this._opChanger) != null ? ref.update() : void 0;
        };
      }

      assignTooltip(content, params) {
        if (this._tooltip != null) {
          this.removeChild(this._tooltip);
        }
        this._tooltip = new KDCore.UI.Sprite_UITooltip(params);
        this._tooltip.addContent(content);
        this.updateTooltip = this.updateTooltipBody;
      }

      destroyTooltip() {
        if (this._tooltip == null) {
          return;
        }
        this.hideTooltip();
        this.removeChild(this._tooltip);
        this._tooltip = null;
        return this.updateTooltip = function() {}; // * EMPTY
      }

      showTooltip() {
        if (this._tooltip == null) {
          return;
        }
        // * Position 0, 0, becouse cursorRelative by default
        this._tooltip.activateTooltip(0, 0, this);
      }

      hideTooltip() {
        if (this._tooltip == null) {
          return;
        }
        this._tooltip.deactivateTooltip();
      }

      //@[DYNAMIC]
      updateTooltip() {} // * EMPTY

      updateTooltipBody() {
        if (this.isUnderMouse()) {
          if (this._tooltip.isTooltipActive()) {

          } else {
            if (this.isReady() && this.visible === true && this.opacity >= 255) {
              return this.showTooltip();
            }
          }
        } else {
          if (this._tooltip.isTooltipActive()) {
            return this.hideTooltip();
          }
        }
      }

      update() {
        super.update();
        this._updateOpChanger();
        return this.updateTooltip();
      }

      //@[DYNAMIC]
      _updateOpChanger() {} // * EMPTY

      b() {
        return this.bitmap;
      }

      clear() {
        return this.bitmap.clear();
      }

      add(child) {
        return this.addChild(child);
      }

      bNew(w, h) {
        if (h == null) {
          h = w;
        }
        return this.bitmap = new Bitmap(w, h);
      }

      bImg(filename, sourceFolder) {
        var getterFunc;
        getterFunc = function(filename) {
          return ImageManager.loadPicture(filename);
        };
        if (sourceFolder != null) {
          getterFunc = function(filename) {
            return ImageManager.loadBitmap("img/" + sourceFolder + "/", filename);
          };
        }
        return this.bitmap = getterFunc(filename);
      }

      onReady(method) {
        if (method != null) {
          return this.bitmap.addLoadListener(method);
        }
      }

      drawText() {
        return this.bitmap.drawText(...arguments);
      }

      drawTextFull(text, position = "center") {
        if (this.textSettingsPosition != null) {
          position = this.textSettingsPosition;
        }
        return this.bitmap.drawTextFull(text, position);
      }

      //?DEPRECATED
      drawTextWithSettings(text) {
        this.clear();
        this.drawTextFull(text, this.textSettingsPosition);
      }

      //? x, y, icon, size
      drawIcon() {
        return this.bitmap.drawIcon(...arguments);
      }

      moveByJson(settings) {
        var pos;
        pos = KDCore.Utils.getPositionPointFromJSON(settings);
        return this.move(pos.x, pos.y);
      }

      applyTextSettingsByJson(sprite, settings) {
        this.applyTextSettingsByExtraSettings(sprite, settings.text);
      }

      applyTextSettingsByExtraSettings(sprite, s) {
        sprite.move(s.marginX, s.marginY);
        sprite.b().fontSize = s.fontSize;
        sprite.b().textColor = KDCore.Color.FromHex(s.textColor).CSS;
        sprite.b().outlineWidth = s.outlineWidth;
        if (s.outlineColor != null) {
          sprite.b().outlineColor = KDCore.Color.FromHex(s.outlineColor).CSS;
        }
        if (s.fontFace != null) {
          sprite.b().fontFace = s.fontFace;
        }
        sprite.b().fontItalic = s.fontItalic;
        sprite.visible = s.visible;
      }

      isReady() {
        var i, j, ref;
        if (this.bitmap != null) {
          if (!this.bitmap.isReady()) {
            return false;
          }
        }
        for (i = j = 0, ref = this.children.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
          if (!this.children[i].bitmap.isReady()) {
            return false;
          }
        }
        return true;
      }

      isCheckAlpha() {
        return false;
      }

      inPosition(point) {
        var e, gx, gy, pixel, result, x, y;
        result = this.isContainsPoint(point);
        if (result && this.isCheckAlpha()) {
          try {
            ({x, y} = point);
            gx = KDCore.SDK.toGlobalCoord(this, 'x');
            gy = KDCore.SDK.toGlobalCoord(this, 'y');
            pixel = this.bitmap.getAlphaPixel(x - gx, y - gy);
            result = pixel > 100;
          } catch (error) {
            e = error;
            KDCore.warning(e);
            result = true; // * ignor Alpha if error
          }
        }
        return result;
      }

      isUnderMouse() {
        return this.inPosition(TouchInput);
      }

      // * Из параметров плагина
      applyFontParam(font) {
        var b;
        if (font == null) {
          return;
        }
        b = this.b();
        if (font.size != null) {
          b.fontSize = font.size;
        }
        if (!String.isNullOrEmpty(font.face)) {
          b.fontFace = font.face;
        }
        if (font.italic != null) {
          b.fontItalic = font.italic;
        }
      }

      applyOutlineParam(outline) {
        var b;
        if (outline == null) {
          return;
        }
        b = this.b();
        if (outline.width != null) {
          b.outlineWidth = outline.width;
        }
        if (!String.isNullOrEmpty(outline.color)) {
          b.outlineColor = outline.color;
        }
      }

      static FromImg(filename, sourceFolder) {
        var s;
        s = new KDCore.Sprite();
        s.bImg(filename, sourceFolder);
        return s;
      }

      static FromBitmap(w, h) {
        var s;
        s = new KDCore.Sprite();
        s.bNew(w, h);
        return s;
      }

      static FromTextSettings(settings) {
        var s;
        s = KDCore.Sprite.FromBitmap(settings.textBoxWidth, settings.textBoxHeight);
        s.applyTextSettingsByExtraSettings(s, settings);
        s.textSettingsPosition = settings.position;
        return s;
      }

      // * Загрузчик из параметров плагина (безопасный)
      static FromParams(pluginParams) {
        var e, h, margins, s, size, w;
        try {
          size = pluginParams.size;
          ({w, h} = size);
          try {
            if (String.any(w)) {
              if (isFinite(w)) {
                w = Number(w);
              } else {
                w = eval(w);
              }
            }
          } catch (error) {
            e = error;
            KDCore.warning(e);
            w = 100;
          }
          try {
            if (String.any(h)) {
              if (isFinite(h)) {
                h = Number(h);
              } else {
                h = eval(h);
              }
            }
          } catch (error) {
            e = error;
            KDCore.warning(e);
            h = 100;
          }
          s = KDCore.Sprite.FromBitmap(w, h);
          s.textSettingsPosition = pluginParams.alignment;
          margins = pluginParams.margins;
          if (margins != null) {
            s.move(margins.x, margins.y);
          }
          s.applyFontParam(pluginParams.font);
          s.applyOutlineParam(pluginParams.outline);
          if (!String.isNullOrEmpty(pluginParams.textColor)) {
            s.b().textColor = pluginParams.textColor;
          }
          if (pluginParams.visible != null) {
            s.visible = pluginParams.visible;
          }
          return s;
        } catch (error) {
          e = error;
          console.warn('Something wrong with Text Settings!', e);
          return KDCore.Sprite.FromBitmap(60, 30);
        }
      }

    };

    return Sprite;

  }).call(this, Sprite);
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  //@[AUTO EXTEND]
  return KDCore.TimedUpdate = class TimedUpdate {
    constructor(interval, method) {
      this.interval = interval;
      this.method = method;
      this._timer = 0;
      this._once = false;
    }

    update() {
      if (this.interval == null) {
        return;
      }
      if (this._timer++ >= this.interval) {
        this.call();
        this._timer = 0;
        if (this._once === true) {
          return this.stop();
        }
      }
    }

    once() {
      return this._once = true;
    }

    onUpdate(method) {
      this.method = method;
    }

    stop() {
      return this.interval = null;
    }

    isAlive() {
      return this.interval != null;
    }

    // * Рандомизировать интервал @interval (-min, +max)
    applyTimeRange(min, max) {
      var value;
      if (!this.isAlive()) {
        return;
      }
      value = KDCore.SDK.rand(min, max);
      return this.interval += value;
    }

    call() {
      if (this.method != null) {
        return this.method();
      }
    }

  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  
    // * Button (Sprite_XButton)

    //@[AUTO EXTEND]
  //?DEPRECATED
  return KDCore.Button = class Button extends Sprite {
    constructor() {
      super();
      this._mouseIn = false;
      this._touching = false;
      this._slowUpdateActive = false;
      this._localMode = false;
      this._images = [];
      this._checkAlpha = false;
      this._textSprite = null;
      this._textPosition = 0;
      this._override = false; // * TouchClick in game messages not work anymore if TRUE
      this._clickHandlers = [];
      this._manualHided = false;
      this._manualDisabled = false;
      this._condition = null; // * Условие для Visible
      this._condition2 = null; // * Условие для Enable \ Disable
      this._disabled = false;
      this._infoData = null;
      this._isNeedShowText = false;
      return;
    }

    isMouseInButton() {
      return this._mouseIn === true;
    }

    isActive() {
      return this.visible === true;
    }

    activateSlowUpdate() {
      return this._slowUpdateActive = true;
    }

    setLocalMode() {
      this._realX = this.x;
      this._realY = this.y;
      return this._localMode = true;
    }

    setAlphaMode() {
      return this._checkAlpha = true;
    }

    // * above, below
    setTextPosition(position) {
      return this._textPosition = position;
    }

    setHelpText(text, size) {
      return this._createText(text, size);
    }

    setInfoData(data) {
      return this._infoData = data;
    }

    setOverrideMode() {
      return this._override = true;
    }

    isOverride() {
      return this._override === true && this.isActive() && this.touchInButton();
    }

    isDisabled() {
      return this._disabled === true;
    }

    isEnabled() {
      return !this.isDisabled();
    }

    isNeedShowText() {
      return this._isNeedShowText === true;
    }

    addClickHandler(method) {
      return this._clickHandlers.push(method);
    }

    clearClickHandlers() {
      return this._clickHandlers = [];
    }

    isLocalMode() {
      return this._localMode === true;
    }

    setCondition(method) {
      return this._condition = method;
    }

    setConditionForDisable(method) {
      return this._condition2 = method;
    }

    getInfoData() {
      return this._infoData;
    }

    simulateClick() { //?NEW
      return this.applyClickedState();
    }

    simulateClickManual() { //?NEW
      this.simulateClick();
      return setTimeout((() => {
        try {
          return this.applyNormalState();
        } catch (error) {

        }
      }), 50);
    }

    prepare() { //?NEW
      return this.slowUpdate();
    }

    realX() {
      if (this.isLocalMode()) {
        return this._realX;
      } else {
        return this.x;
      }
    }

    realY() {
      if (this.isLocalMode()) {
        return this._realY;
      } else {
        return this.y;
      }
    }

    show() {
      this.visible = true;
      return this._manualHided = false;
    }

    hide() {
      this.visible = false;
      return this._manualHided = true;
    }

    disable() {
      this._disabled = true;
      this._manualDisabled = true;
      this.refreshEnDisState();
      return this._mouseIn = false;
    }

    enable() {
      this._disabled = false;
      this._manualDisabled = false;
      return this.refreshEnDisState();
    }

    update() {
      super.update();
      if (this._destroyed === true) {
        return;
      }
      this.updateMouseClick();
      this.updatePosition();
      if (!this._slowUpdateActive) {
        this.slowUpdate();
      }
      return this.updateComplexTextVisible();
    }

    slowUpdate() {
      if (this._destroyed === true) {
        return;
      }
      this.updateMouseTracking();
      this.updateConditionForVisible();
      return this.updateConditionForEnabling();
    }

    updateMouseTracking() {
      if (!this.isActive()) {
        return;
      }
      if (this.isDisabled()) {
        return;
      }
      if (this.cursorInButton()) {
        this._onMouseEnter();
        return this._mouseIn = true;
      } else {
        this._onMouseLeave();
        return this._mouseIn = false;
      }
    }

    // * In MZ TouchInput always have X,Y
    cursorInButton() {
      return this.touchInButton();
    }

    xyInButton(x, y) {
      var inRect, rect, rx, ry;
      rx = KDCore.SDK.toGlobalCoord(this, 'x');
      ry = KDCore.SDK.toGlobalCoord(this, 'y');
      rect = new PIXI.Rectangle(rx, ry, this._realWidth(), this._realHeight());
      inRect = rect.contains(x, y);
      if (inRect === true && this._checkAlpha === true) {
        return this._checkAlphaPixel(x - rx, y - ry);
      } else {
        return inRect;
      }
    }

    _realWidth() {
      if (this._hasImage()) {
        return this._mainImage().width;
      } else {
        return this.width;
      }
    }

    _hasImage() {
      return this._mainImage() != null;
    }

    _mainImage() {
      return this._images[0];
    }

    _realHeight() {
      if (this._hasImage()) {
        return this._mainImage().height;
      } else {
        return this.height;
      }
    }

    _checkAlphaPixel(x, y) {
      var pixel;
      pixel = this._hasImage() ? this._mainImage().bitmap.getAlphaPixel(x, y) : this.bitmap.getAlphaPixel(x, y);
      return pixel >= 200;
    }

    _onMouseEnter() {
      if (this._mouseIn === true) {
        return;
      }
      if (!this.isDisabled()) {
        this.applyCoverState();
      }
      this._showText();
      if (this.getInfoData() != null) {
        return this._startComplexTimer();
      }
    }

    _onMouseLeave() {
      if (this._mouseIn === false) {
        return;
      }
      if (!this.isDisabled()) {
        this.applyNormalState();
      }
      this._hideText();
      return this._stopComplexTimer();
    }

    _showText() {
      if (this._textSprite == null) {
        return;
      }
      this._updateTextPosition();
      return this._textSprite.visible = true;
    }

    _hideText() {
      if (this._textSprite == null) {
        return;
      }
      return this._textSprite.visible = false;
    }

    _startComplexTimer() {
      this._stopComplexTimer();
      return this._cTimer = setTimeout((() => {
        if (this._mouseIn === true) {
          return this._isNeedShowText = true;
        }
      }), 1000);
    }

    _stopComplexTimer() {
      if (this._cTimer != null) {
        clearTimeout(this._cTimer);
      }
      return this._isNeedShowText = false;
    }

    updateMouseClick() {
      if (!this.isActive()) {
        this._unTouch();
        return;
      }
      if (this.isDisabled()) {
        return;
      }
      if (TouchInput.isTriggered() && this.touchInButton()) {
        this._touching = true;
        this.applyClickedState();
      }
      if (this._touching === true) {
        if (TouchInput.isReleased() || !this.touchInButton()) {
          this._unTouch();
          if (TouchInput.isReleased()) {
            return this.callClickHandler();
          }
        }
      }
    }

    _unTouch() {
      this._touching = false;
      if (this.touchInButton()) {
        return this.applyCoverState();
      } else {
        return this.applyNormalState();
      }
    }

    touchInButton() {
      return this.xyInButton(TouchInput.x, TouchInput.y);
    }

    callClickHandler() {
      if (this._clickHandlers.length > 0) {
        return this._clickHandlers.forEach(function(method) {
          return method();
        });
      }
    }

    updatePosition() {
      var p;
      if (!this._localMode) {
        return;
      }
      p = new KDCore.Point(this._realX, this._realY);
      return this.move(p.screenX(), p.screenY());
    }

    updateConditionForVisible() {
      var result;
      if (this._condition == null) {
        return;
      }
      if (this._manualHided === true) {
        return;
      }
      try {
        result = this._condition();
        return this.visible = !result;
      } catch (error) {
        console.warn('wrong condition in button');
        return this.visible = true;
      }
    }

    updateConditionForEnabling() {
      if (!this._condition2) {
        return;
      }
      if (this._manualDisabled === true) {
        return;
      }
      try {
        this._disabled = this._condition2();
        return this.refreshEnDisState();
      } catch (error) {
        console.warn('wrong condition in button for enable state');
        return this.disable();
      }
    }

    setButtonImages(img1, img2, img3, img4) {
      if (this._images != null) {
        this._images.forEach(function(img) {
          if (img != null) {
            return img.parent.removeChild(img);
          }
        });
      }
      this._images = [new Sprite(img1), img2 != null ? new Sprite(img2) : void 0, img3 != null ? new Sprite(img3) : void 0, img4 != null ? new Sprite(img4) : void 0];
      this._images.forEach((img) => {
        if (img != null) {
          return this.addChild(img);
        }
      });
      return this.applyNormalState();
    }

    applyNormalState() {
      var ref;
      this.refreshImages();
      return (ref = this._images[0]) != null ? ref.visible = true : void 0;
    }

    refreshImages() {
      return this._images.forEach(function(img) {
        return img != null ? img.visible = false : void 0;
      });
    }

    applyCoverState() {
      this.refreshImages();
      if (this._images[1] != null) {
        return this._images[1].visible = true;
      } else {
        return this.applyNormalState();
      }
    }

    applyClickedState() {
      this.refreshImages();
      if (this._images[2] != null) {
        return this._images[2].visible = true;
      } else {
        return this.applyNormalState();
      }
    }

    _createText(text, size) {
      var h, w;
      if (this._textSprite) {
        this.removeChild(this._textSprite);
      }
      w = Math.round(((size / 10) + 1) * 5 * text.length);
      h = size + 4;
      this._textSprite = new Sprite(new Bitmap(w, h));
      this._textSprite.bitmap.fontSize = size;
      this._textSprite.bitmap.drawText(text, 0, h / 2, w, 1, 'center');
      this._textSprite.visible = false;
      return this.addChild(this._textSprite);
    }

    _updateTextPosition() {
      var nx, ny;
      if (!this._textSprite) {
        return;
      }
      nx = this._realWidth() / 2 - this._textSprite.width / 2;
      if (this._textPosition === 0) {
        ny = -this._textSprite.height;
      } else {
        ny = this._realHeight() + this._textSprite.height / 2;
      }
      return this._textSprite.move(nx, ny);
    }

    applyDisableState() {
      var ref;
      this.refreshImages();
      return (ref = this._images[3]) != null ? ref.visible = true : void 0;
    }

    refreshEnDisState() {
      if (this.isDisabled()) {
        this.applyDisableState();
        return this._hideText();
      } else {
        if (this._mouseIn === false) {
          return this.applyNormalState();
        }
      }
    }

    //else
    //    do @applyCoverState
    updateComplexTextVisible() {}

    applyScale(mod) {
      var i, img, len, ref;
      ref = this._images;
      for (i = 0, len = ref.length; i < len; i++) {
        img = ref[i];
        if (img != null) {
          img.scale.x = mod;
          img.scale.y = mod;
        }
      }
    }

    static FromSet(imgName, sourceFolder = null) {
      var button, getterFunc, img0, img1;
      getterFunc = function(filename) {
        return ImageManager.loadPicture(filename);
      };
      if (sourceFolder != null) {
        getterFunc = function(filename) {
          return ImageManager.loadBitmap("img/" + sourceFolder + "/", filename);
        };
      }
      img0 = getterFunc(imgName + "_00");
      img1 = getterFunc(imgName + "_01");
      button = new KDCore.Button();
      button.setButtonImages(img0, img1, img0, img0);
      return button;
    }

    static FromSetFull(imgName, sourceFolder = null) {
      var button, getterFunc, img0, img1, img2, img3;
      getterFunc = function(filename) {
        return ImageManager.loadPicture(filename);
      };
      if (sourceFolder != null) {
        getterFunc = function(filename) {
          return ImageManager.loadBitmap("img/" + sourceFolder + "/", filename);
        };
      }
      img0 = getterFunc(imgName + "_00");
      img1 = getterFunc(imgName + "_01");
      img2 = getterFunc(imgName + "_02");
      img3 = getterFunc(imgName + "_03");
      button = new KDCore.Button();
      button.setButtonImages(img0, img1, img2, img3);
      return button;
    }

  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Sprite_ButtonsGroup;
  // * Класс для реализации набора кнопок переключателей (Tabs)
  // * Когда только одна кнопка может быть нажата (выбрана)

    //rev 07.10.21
  Sprite_ButtonsGroup = class Sprite_ButtonsGroup extends KDCore.Sprite {
    // buttonsArray = [
    //       {image: NAME, position: [X,Y]}, ...
    //    ]
    constructor(buttonsArray, activeIndex, clickCallback) {
      var button, i, len;
      super();
      this.clickCallback = clickCallback;
      this._buttons = [];
      for (i = 0, len = buttonsArray.length; i < len; i++) {
        button = buttonsArray[i];
        this._createButton(button);
      }
      this._onButtonClick(activeIndex);
      return;
    }

    getSelectedIndex() {
      return this._buttons.findIndex(function(btn) {
        return !btn.isEnabled();
      });
    }

  };
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = Sprite_ButtonsGroup.prototype;
    _._createButton = function({image, position}) {
      var btn, index, method;
      // * Так как кнопки работают как переключатели, то 03 должен быть всегда
      index = this._buttons.length;
      btn = new KDCore.ButtonM(image, true, "Alpha");
      btn.move(position);
      method = () => {
        return this._onButtonClick(index);
      };
      btn.addClickHandler(method);
      this._buttons.push(btn);
      this.add(btn);
    };
    _._onButtonClick = function(index = 0) {
      var ref;
      this._resetAllButtons();
      if ((ref = this._buttons[index]) != null) {
        ref.disable(); // * Нажата
      }
      if (this.clickCallback != null) {
        this.clickCallback(index);
      }
    };
    _._resetAllButtons = function() {
      var btn, i, len, ref;
      ref = this._buttons;
      for (i = 0, len = ref.length; i < len; i++) {
        btn = ref[i];
        if (btn != null) {
          btn.enable();
        }
      }
    };
  })();
  // ■ END PRIVATE
  //---------------------------------------------------------------------------
  return KDCore.Sprite_ButtonsGroup = Sprite_ButtonsGroup;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Sprite_ButtonsGroupHandler;
  // * Класс для реализации набора кнопок переключателей (Tabs)
  // * Когда только одна кнопка может быть нажата (выбрана)
  // * В отличии от Sprite_ButtonsGroup, принимает массив
  // * уже созданных кнопок

    //rev 10.07.22
  Sprite_ButtonsGroupHandler = class Sprite_ButtonsGroupHandler extends KDCore.Sprite {
    // _buttons = [Button object with enable, disable, isEnable, addClickHandler methods]
    constructor(_buttons, clickCallback, activeIndex = 0) {
      var button, i, index, len, ref;
      super();
      this._buttons = _buttons;
      this.clickCallback = clickCallback;
      ref = this._buttons;
      for (index = i = 0, len = ref.length; i < len; index = ++i) {
        button = ref[index];
        this._processButton(button, index);
      }
      this._onButtonClick(activeIndex);
      return;
    }

    getSelectedIndex() {
      return this._buttons.findIndex(function(btn) {
        return !btn.isEnabled();
      });
    }

  };
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = Sprite_ButtonsGroupHandler.prototype;
    _._processButton = function(btn, index) {
      var method;
      // * Так как кнопки работают как переключатели, то 03 должен быть всегда
      method = () => {
        return this._onButtonClick(index);
      };
      btn.addClickHandler(method);
      this.add(btn);
    };
    _._onButtonClick = function(index = 0) {
      var ref;
      this._resetAllButtons();
      if ((ref = this._buttons[index]) != null) {
        ref.disable(); // * Нажата
      }
      if (this.clickCallback != null) {
        this.clickCallback(index);
      }
    };
    _._resetAllButtons = function() {
      var btn, i, len, ref;
      ref = this._buttons;
      for (i = 0, len = ref.length; i < len; i++) {
        btn = ref[i];
        if (btn != null) {
          btn.enable();
        }
      }
    };
  })();
  // ■ END PRIVATE
  //---------------------------------------------------------------------------
  return KDCore.Sprite_ButtonsGroupHandler = Sprite_ButtonsGroupHandler;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad((function() {
  var Sprite_TilingFrame;
  Sprite_TilingFrame = class Sprite_TilingFrame extends KDCore.Sprite {
    constructor(width, height, skinBitmap) {
      super();
      this.width = width;
      this.height = height;
      this.skinBitmap = skinBitmap;
      this._createParts();
      this._refreshAll();
    }

    _createParts() {
      var i, j;
      this.backSprite = new Sprite();
      this.addChild(this.backSprite);
      this.content = new Sprite();
      this.addChild(this.content);
      this._outFrame = new Sprite();
      for (i = j = 0; j < 8; i = ++j) {
        this._outFrame.addChild(new Sprite());
      }
      return this.addChild(this._outFrame);
    }

    // * Отступ, чтобы за рамку не выходить
    _fillPadding() {
      return 2;
    }

    // * Размер частей на картинке
    _fillImagePartWidth() {
      return 96;
    }

    _fillImagePartHeight() {
      return 96;
    }

    // * Толщина рамки
    _frameThickness() {
      return 12;
    }

    _refreshAll() {
      this._refreshBack();
      return this._refreshTFrame();
    }

    _refreshBack() {
      var fh, fw, h, m, sprite, w;
      m = this._fillPadding();
      w = Math.max(0, this.width - m * 2);
      h = Math.max(0, this.height - m * 2);
      sprite = this.backSprite;
      sprite.bitmap = this.skinBitmap;
      // * Координаты фона из картинки
      fw = this._fillImagePartWidth();
      fh = this._fillImagePartHeight();
      sprite.setFrame(0, 0, fw, fh);
      sprite.move(m, m);
      sprite.scale.x = w / fw;
      return sprite.scale.y = h / fh;
    }

    _refreshTFrame() {
      var drect, fh, fw, j, len, m, ref, spr, srect;
      fw = this._fillImagePartWidth();
      fh = this._fillImagePartHeight();
      // * Положение назначения
      drect = {
        x: 0,
        y: 0,
        width: this.width,
        height: this.height
      };
      // * Координаты рамки на картинке
      srect = {
        x: fw,
        y: 0,
        width: fw,
        height: fh
      };
      m = this._frameThickness(); // * Толщина
      ref = this._outFrame.children;
      for (j = 0, len = ref.length; j < len; j++) {
        spr = ref[j];
        spr.bitmap = this.skinBitmap;
      }
      if (KDCore.isMZ()) {
        Window.prototype._setRectPartsGeometry.call(this, this._outFrame, srect, drect, m);
      } else {
        this._setRectPartsGeometry(this._outFrame, srect, drect, m);
      }
    }

    // * Этот метод существует в MZ, но нет в MV
    //? From MZ
    _setRectPartsGeometry(sprite, srect, drect, m) {
      var child, children, dh, dmh, dmw, dw, dx, dy, j, len, sh, smh, smw, sw, sx, sy;
      sx = srect.x;
      sy = srect.y;
      sw = srect.width;
      sh = srect.height;
      dx = drect.x;
      dy = drect.y;
      dw = drect.width;
      dh = drect.height;
      smw = sw - m * 2;
      smh = sh - m * 2;
      dmw = dw - m * 2;
      dmh = dh - m * 2;
      children = sprite.children;
      sprite.setFrame(0, 0, dw, dh);
      sprite.move(dx, dy);
      // corner
      children[0].setFrame(sx, sy, m, m);
      children[1].setFrame(sx + sw - m, sy, m, m);
      children[2].setFrame(sx, sy + sw - m, m, m);
      children[3].setFrame(sx + sw - m, sy + sw - m, m, m);
      children[0].move(0, 0);
      children[1].move(dw - m, 0);
      children[2].move(0, dh - m);
      children[3].move(dw - m, dh - m);
      // edge
      children[4].move(m, 0);
      children[5].move(m, dh - m);
      children[6].move(0, m);
      children[7].move(dw - m, m);
      children[4].setFrame(sx + m, sy, smw, m);
      children[5].setFrame(sx + m, sy + sw - m, smw, m);
      children[6].setFrame(sx, sy + m, m, smh);
      children[7].setFrame(sx + sw - m, sy + m, m, smh);
      children[4].scale.x = dmw / smw;
      children[5].scale.x = dmw / smw;
      children[6].scale.y = dmh / smh;
      children[7].scale.y = dmh / smh;
      // center
      if (children[8] != null) {
        children[8].setFrame(sx + m, sy + m, smw, smh);
        children[8].move(m, m);
        children[8].scale.x = dmw / smw;
        children[8].scale.y = dmh / smh;
      }
      for (j = 0, len = children.length; j < len; j++) {
        child = children[j];
        child.visible = dw > 0 && dh > 0;
      }
    }

  };
  return KDCore.Sprite_TilingFrame = Sprite_TilingFrame;
}));


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Window_ExtTextLineBase;
  // * Данное окно используется как основа для Sprite_UITextExt
  //rev 07.10.21
  Window_ExtTextLineBase = class Window_ExtTextLineBase extends Window_Base {
    constructor(rect, fontSettings) {
      super(rect);
      this.fontSettings = fontSettings;
      this.createContents();
      // * Всегда прозрачное окно
      this.setBackgroundType(2);
    }

    // * Нет отступов
    updatePadding() {
      return this.padding = 0;
    }

    // * Нет отступов
    itemPadding() {
      return 0;
    }

    textPadding() {
      return 0;
    }

    standardPadding() {
      return 0;
    }

    contentsWidth() {
      return this.width;
    }

    contentsHeight() {
      return this.height;
    }

    // * Более гибкая настройка размера текста при { }
    makeFontBigger() {
      return this.contents.fontSize += 1;
    }

    makeFontSmaller() {
      if (this.contents.fontSize > 1) {
        return this.contents.fontSize -= 1;
      }
    }

    // * Применение своих шрифта и размера текста
    resetFontSettings() {
      super.resetFontSettings();
      if (this.fontSettings == null) {
        return;
      }
      if (String.any(this.fontSettings.face)) {
        this.contents.fontFace = this.fontSettings.face;
      }
      if (this.fontSettings.size > 0) {
        this.contents.fontSize = this.fontSettings.size;
      }
      if (this.fontSettings.italic != null) {
        this.contents.fontItalic = this.fontSettings.italic;
      }
    }

  };
  return KDCore.Window_ExtTextLineBase = Window_ExtTextLineBase;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  // * Button M
  //------------------------------------------------------------------------------
  //@[AUTO EXTEND]
  // * Button Mini - упрощённый класс Sprite_XButton (KDCore.Button)

    // * Принимает название файла изображения кнопки без _00
  // * Названия изображения должны быть в стандартном формате _00, _01, [_03]
  // * _02 - не используются в этом классе

    // * Класс использует глобальную временную переменную для определения находится ли мышь в зоне кнопки

    //TODO: ADD ALPHA CHECK!

    // * Если isFull - true, значит нужен _03
  KDCore.ButtonM = class ButtonM extends KDCore.Sprite {
    constructor(filename, isFull = false, sourceFolder = null) {
      super();
      this._bitmaps = [];
      this._disabled = false;
      this._isTriggered = false;
      // * Когда произошло нажатие на кнопку
      this._handler = null;
      this._isCanBeClicked = true;
      this._isManualHoverMode = false;
      this._isManualSelected = false;
      this._loadBitmaps(filename, isFull, sourceFolder);
      this._setImageState(0);
      this._createThread();
    }

    setManualHover() {
      return this._isManualHoverMode = true;
    }

    disableManualHover() {
      return this._isManualHoverMode = false;
    }

    setManualSelected(_isManualSelected) {
      this._isManualSelected = _isManualSelected;
    }

    enableClick() {
      return this._isCanBeClicked = true;
    }

    disableClick() {
      return this._isCanBeClicked = false;
    }

    desaturate() {
      this.filters = [new PIXI.filters.ColorMatrixFilter()];
      this.filters[0].desaturate();
    }

    isMouseIn() {
      if (this._isManualHoverMode === true) {
        return this._isManualSelected;
      } else {
        return this.isUnderMouse() && this.visible === true;
      }
    }

    isActive() {
      if (this._isCanBeClicked === false) {
        return false;
      }
      if (this.parent != null) {
        return this.parent.visible === true && this.visible === true;
      } else {
        return this.visible === true;
      }
    }

    isDisabled() {
      return this._disabled === true;
    }

    addClickHandler(_handler) {
      this._handler = _handler;
    }

    clearClickHandler() {
      return this._handler = null;
    }

    // * Воспроизводит визуальный эффект нажатия
    simulateClick() {
      if (!this.isActive()) {
        return;
      }
      if (this.isDisabled()) {
        return;
      }
      if (this.isMouseIn()) {
        return;
      }
      this._startSimulation();
    }

    isEnabled() {
      return !this.isDisabled();
    }

    refreshState(isEnable = true) {
      if (isEnable === true) {
        if (this.isDisabled()) {
          this.enable();
        }
      } else {
        if (this.isEnabled()) {
          this.disable();
        }
      }
    }

    disable() {
      this._disabled = true;
      return this._setImageState(2);
    }

    enable() {
      this._disabled = false;
      return this._setImageState(0);
    }

    click() {
      if (this._handler != null) {
        return this._handler();
      }
    }

    update() {
      super.update();
      return this._updateMain();
    }

  };
  return (function() {    
    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ ButtonM Implementation
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _, alias_SM_isAnyButtonPressed, alias_SM_onMapLoaded;
    //@[DEFINES]
    _ = KDCore.ButtonM.prototype;
    _._loadBitmaps = function(filename, isFull = false, sourceFolder = null) {
      var getterFunc;
      getterFunc = this._getGetter(sourceFolder);
      this._bitmaps.push(getterFunc(filename + '_00'));
      this._bitmaps.push(getterFunc(filename + '_01'));
      if (isFull) {
        this._bitmaps.push(getterFunc(filename + '_03'));
      }
    };
    _._getGetter = function(sourceFolder = null) {
      var getterFunc;
      getterFunc = function(filename) {
        return ImageManager.loadPicture(filename);
      };
      if (sourceFolder !== null) {
        getterFunc = function(filename) {
          return ImageManager.loadBitmap('img/' + sourceFolder + '/', filename);
        };
      }
      return getterFunc;
    };
    _._setImageState = function(index = 0) {
      if (this._bitmaps[index] == null) {
        index = 0;
      }
      this.bitmap = this._bitmaps[index];
      this._lastState = index;
    };
    _._createThread = function() {
      this.hoverThread = new KDCore.TimedUpdate(3, this._updateHover.bind(this));
      this.hoverThread.applyTimeRange(-1, 1);
      this.hoverThread.call();
    };
    //?[DYNAMIC]
    _._updateMain = function() {
      this._updateMouseLogic();
      if (!this.isActive()) {
        if (($gameTemp.kdButtonUnderMouse != null) && $gameTemp.kdButtonUnderMouse === this) {
          return $gameTemp.kdButtonUnderMouse = null;
        }
      }
    };
    _._updateMouseLogic = function() {
      this.hoverThread.update();
      return this._updateMouseClick();
    };
    _._updateHover = function() {
      if (!this.isActive()) {
        return;
      }
      // * чтобы эффект нажатия не прекратить
      if (this._isTriggered === true) {
        return;
      }
      if (this.isMouseIn()) {
        if (this._lastState !== 1) {
          if (!this.isDisabled()) {
            this._setImageState(1);
          }
          $gameTemp.kdButtonUnderMouse = this;
        }
      } else {
        if (this._lastState !== 0) {
          if (!this.isDisabled()) {
            this._setImageState(0);
          }
          if ($gameTemp.kdButtonUnderMouse === this) {
            $gameTemp.kdButtonUnderMouse = null;
          }
        } else if ($gameTemp.kdButtonUnderMouse === this) {
          $gameTemp.kdButtonUnderMouse = null;
        }
      }
    };
    _._updateMouseClick = function() {
      if (!this.isActive()) {
        return;
      }
      if (this.isDisabled()) {
        return;
      }
      if (TouchInput.isTriggered() && this.isMouseIn()) {
        this._isTriggered = true;
        this._setImageState(0);
      }
      if (this._isTriggered === true) {
        if (TouchInput.isReleased()) {
          this._isTriggered = false;
          if (this.isMouseIn()) {
            this.click();
          }
        }
      }
    };
    _._startSimulation = function() {
      this._setImageState(1);
      this._simulateThread = new KDCore.TimedUpdate(10, () => {
        return this._setImageState(0);
      });
      this._simulateThread.once();
      return this._updateMain = this._updateMouseClickSimulated;
    };
    _._updateMouseClickSimulated = function() {
      this._simulateThread.update();
      if (!this._simulateThread.isAlive()) {
        this._simulateThread = null;
        this._updateMain = this._updateMouseLogic;
      }
    };
    // * Теперь при нажатии на любую кнопку, игрок не будет ходить по карте

    //@[ALIAS]
    alias_SM_isAnyButtonPressed = Scene_Map.prototype.isAnyButtonPressed;
    Scene_Map.prototype.isAnyButtonPressed = function() {
      if ($gameTemp.kdButtonUnderMouse != null) {
        return true;
      } else {
        return alias_SM_isAnyButtonPressed.call(this);
      }
    };
    //TODO: Добавить доп. проверку?
    //@[ALIAS]
    alias_SM_onMapLoaded = Scene_Map.prototype.onMapLoaded;
    Scene_Map.prototype.onMapLoaded = function() {
      $gameTemp.kdButtonUnderMouse = null;
      setTimeout((function() {
        return $gameTemp.kdButtonUnderMouse = null;
      }), 50);
      return alias_SM_onMapLoaded.call(this);
    };
  })();
});

// ■ END ButtonM Implementation
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  // * Button Mini User - класс с определением файла каждого состояния отдельно
  // * Принимает теже аргументы, только заместо имени файла, три изображения (имени)
  // ? states = { main, hover, disabled }
  return KDCore.ButtonMU = class ButtonMU extends KDCore.ButtonM {
    constructor() {
      super(...arguments);
    }

    //$[OVER]
    _loadBitmaps(states, isFull = true, sourceFolder = null) {
      var getterFunc;
      getterFunc = this._getGetter(sourceFolder);
      this._bitmaps.push(getterFunc(states.main));
      this._bitmaps.push(getterFunc(states.hover));
      // * Optional 03
      if (String.any(states.disabled)) {
        this._bitmaps.push(getterFunc(states.disabled));
      }
    }

  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Sprite_TilingLine;
  Sprite_TilingLine = class Sprite_TilingLine extends KDCore.Sprite_TilingFrame {
    constructor() {
      super(...arguments);
    }

    //$[OVER BASE ALL BELOW]
    _fillPadding() {
      return 0;
    }

    _refreshTFrame() {} // * EMPTY

    _fillImagePartWidth() {
      return 4;
    }

    _fillImagePartHeight() {
      return 26;
    }

  };
  return KDCore.Sprite_TilingLine = Sprite_TilingLine;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  // * Пространство имён для всех UIElements
  KDCore.UI = KDCore.UI || {};
  (function() {    // * Общий класс для всех UI элементов
    //?rev 13.10.20
    var Sprite_UIElement;
    Sprite_UIElement = (function() {
      // * ABSTRACT значит что класс сам по себе ничего не создаёт, не хранит данные
      //@[ABSTRACT]
      class Sprite_UIElement extends KDCore.Sprite {
        constructor(params) {
          super();
          this.params = params;
          this._init();
        }

        // * Стандартный набор настроек
        defaultParams() {
          return {
            visible: true
          };
        }

        // * Общий метод (есть у всех элементов)
        // * По умолчанию вызывает drawText, но потомки могут переопределить
        draw() {
          return this.drawText(...arguments);
        }

        // * Общий метод
        drawText() {} // * EMPTY

        
          // * Если изначально невидимый (из параметров), то не активный вообще
        isActive() {
          return this.params.visible === true;
        }

        rootImageFolder() {
          if (String.any(this.params.rootImageFolder)) {
            return this.params.rootImageFolder;
          } else {
            return Sprite_UIElement.RootImageFolder;
          }
        }

        // * Сделать чёрно белым
        desaturate() {
          this.filters = [new PIXI.filters.ColorMatrixFilter()];
          this.filters[0].desaturate();
        }

        // * Общий метод (можно ли редактировать визуально)
        isCanBeEdited() {
          return false;
        }

        // * Общий метод (надо ли скрывать при игровом сообщнии)
        isHaveHideWithMessageFlag() {
          return false;
        }

        // * Общий метод (находится ли объект под мышкой)
        isUnderMouse() {
          var ref;
          return (ref = this.zeroChild()) != null ? ref.isUnderMouse() : void 0;
        }

        // * Параметры первого элемента (если он есть)
        realWidth() {
          var child;
          child = this.zeroChild();
          if (child != null) {
            if (child instanceof KDCore.UI.Sprite_UIElement) {
              return child.realWidth();
            } else {
              return child.width;
            }
          }
          return 0;
        }

        realHeight() {
          var child;
          child = this.zeroChild();
          if (child != null) {
            if (child instanceof KDCore.UI.Sprite_UIElement) {
              return child.realHeight();
            } else {
              return child.height;
            }
          }
          return 0;
        }

        // * Первый "физический" элемент (спрайт)
        zeroChild() {
          return this.children[0];
        }

        // * Метод восстановления значения на стандартные настройки
        reset(property) {
          var e;
          try {
            switch (property) {
              case "position":
                this._resetPosition();
                break;
              default:
                this[property] = this.params[property];
            }
          } catch (error) {
            e = error;
            KDCore.warning(e);
          }
        }

      };

      // * Корневая директория для изображений
      Sprite_UIElement.RootImageFolder = "Alpha";

      return Sprite_UIElement;

    }).call(this);
    KDCore.UI.Sprite_UIElement = Sprite_UIElement;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIElement.prototype;
    _._init = function() {
      var e;
      this._prepare();
      try {
        return this._createContent();
      } catch (error) {
        e = error;
        KDCore.warning(e);
        // * Если при создании произошла ошибка, отключаем элемент
        return this.isActive = function() {
          return false;
        };
      }
    };
    
    // * Подготовка элемента (проверка параметров)
    _._prepare = function() {
      if (this.params == null) {
        this.params = this.defaultParams();
      }
      return this.visible = this.params.visible;
    };
    // * Наследники создают свои элементы в этом методе
    _._createContent = function() {}; // * EMPTY
    
    // * Сброс позиции
    _._resetPosition = function() {
      var e, x, y;
      if (this.params.position == null) {
        return;
      }
      try {
        ({x, y} = this.params.position);
        this.move(x, y);
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UIButton;
    // * Кнопка на экране, можно нажимать
    Sprite_UIButton = class Sprite_UIButton extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          image: "Button_Inventory",
          isHaveDisabled: true,
          rootImageFolder: null, //?optional
          click: "console.log('click')" // * число или код
        };
      }

      // * Кнопка не поддерживает перерисовку
      draw() {} // * EMPTY

      disable() {
        var ref;
        return (ref = this.button) != null ? ref.disable() : void 0;
      }

      enable() {
        var ref;
        return (ref = this.button) != null ? ref.enable() : void 0;
      }

      setState(isEnabled) {
        if (isEnabled) {
          return this.enable();
        } else {
          return this.disable();
        }
      }

      
        // * Просто вызов метода
      call() {
        var ref;
        return (ref = this.button) != null ? ref.click() : void 0;
      }

      // * Вызов метода с симуляцией нажатия
      click() {
        var ref, ref1;
        if ((ref = this.button) != null) {
          ref.click();
        }
        return (ref1 = this.button) != null ? ref1.simulateClick() : void 0;
      }

    };
    KDCore.UI.Sprite_UIButton = Sprite_UIButton;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIButton.prototype;
    //$[OVER]
    _._createContent = function() {
      if (this.params.image.isEmpty()) {
        KDCore.warning('You try create Button without image');
        return;
      }
      this.button = new KDCore.ButtonM(this.params.image, this.params.isHaveDisabled, this.rootImageFolder());
      this.add(this.button);
      return this._registerClickMethod();
    };
    _._registerClickMethod = function() {
      var commonEventId, e, method, ref, script;
      if (!String.any(this.params.click)) {
        return;
      }
      method = null;
      try {
        // * Если число, то значит общее событие
        if (isFinite(this.params.click)) {
          commonEventId = parseInt(this.params.click);
          if (commonEventId > 0) {
            method = function() {
              return $gameTemp.reserveCommonEvent(commonEventId);
            };
          }
        } else {
          // * Иначе скрипт
          script = this.params.click;
          method = function() {
            return eval(script);
          };
        }
        return this.button.addClickHandler(method);
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return (ref = this.button) != null ? ref.clearClickHandler() : void 0;
      }
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {    // * Рисует лицо персонажа (из папки Faces)
    var Sprite_UIFace;
    Sprite_UIFace = class Sprite_UIFace extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          faceName: "Actor1",
          faceIndex: 0,
          mirror: false,
          size: 144
        };
      }

      draw() {
        return this.drawFace(...arguments);
      }

      drawFace(faceName, faceIndex) {
        return this._drawFaceWhenReady(faceName, faceIndex);
      }

    };
    KDCore.UI.Sprite_UIFace = Sprite_UIFace;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIFace.prototype;
    //$[OVER]
    _._createContent = function() {
      return this._createFaceSprite();
    };
    _._createFaceSprite = function() {
      this._faceSpr = KDCore.Sprite.FromBitmap(this.params.size);
      if (this.params.mirror === true) {
        this._flipFaceSpr();
      }
      this.add(this._faceSpr);
      this._drawFaceWhenReady(this.params.faceName, this.params.faceIndex);
    };
    _._flipFaceSpr = function() {
      this._faceSpr.scale.x = -1;
      this._faceSpr.x = this.params.size;
    };
    _._drawFaceWhenReady = function(name, index = 0) {
      var ref;
      if ((ref = this._faceSpr) != null) {
        ref.clear();
      }
      if (!String.any(name)) {
        return;
      }
      if (index < 0) {
        return;
      }
      this._drawOnReady = {name, index};
      this._faceSourceBitmap = ImageManager.loadFace(name);
      this._faceSourceBitmap.addLoadListener(this._drawFace.bind(this));
      this._drawFace();
    };
    _._drawFace = function() {
      var fh, fw, size, sx, sy;
      if (this._faceSpr == null) {
        return;
      }
      this._faceSpr.clear();
      if (!String.any(this._drawOnReady.name)) {
        return;
      }
      if (KDCore.isMZ()) {
        fw = ImageManager.faceWidth;
        fh = ImageManager.faceHeight;
      } else {
        fw = Window_Base._faceWidth;
        fh = Window_Base._faceHeight;
      }
      size = this.params.size;
      sx = (this._drawOnReady.index % 4) * fw;
      sy = Math.floor(this._drawOnReady.index / 4) * fh;
      this._faceSpr.bitmap.blt(this._faceSourceBitmap, sx, sy, fw, fh, 0, 0, size, size);
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {    //TODO: ROOT IMAGE FOLDER AS PARAMETER!!!
    var Sprite_UIGauge;
    Sprite_UIGauge = class Sprite_UIGauge extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          fill: "",
          foreground: "",
          mask: "",
          backColor: "#000000".toCss(),
          backOpacity: 255,
          vertical: false,
          rootImageFolder: null //?optional
        };
      }

      draw() {
        return this.drawGauge(...arguments);
      }

      drawGauge(percent = 1) {
        this._lastValue = percent;
        return this._drawGauge(percent);
      }

      isVertical() {
        return this.params.vertical === true;
      }

    };
    KDCore.UI.Sprite_UIGauge = Sprite_UIGauge;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIGauge.prototype;
    //$[OVER]
    _._createContent = function() {
      // * Загружается главное изображение, затем уже все остальные, т.к. нужны размеры
      return this._loadFillImage();
    };
    _._loadFillImage = function() {
      // * Главное изображение, поэтому если не указано, то ничего
      if (this.params.fill.isEmpty()) {
        KDCore.warning('You try create Gauge without fill image');
        return;
      }
      KDCore.Utils.loadImageAsync(this.rootImageFolder(), this.params.fill).then(this._createParts.bind(this));
    };
    // * Получаем изображение заполнения и создаём части (т.к. есть размеры)
    _._createParts = function(fillBitmap) {
      this.fillBitmap = fillBitmap;
      this._createBackground();
      this._createFillLayer();
      this._loadForeground();
      this._loadMask();
      return this._onReady();
    };
    _._createBackground = function() {
      this.background = KDCore.Sprite.FromBitmap(this.fillBitmap.width, this.fillBitmap.height);
      this.background.b().fillAll(this.params.backColor);
      this.background.opacity = this.params.backOpacity;
      return this.add(this.background);
    };
    _._createFillLayer = function() {
      this.fillLayer = KDCore.Sprite.FromBitmap(this.fillBitmap.width, this.fillBitmap.height);
      return this.add(this.fillLayer);
    };
    _._loadForeground = function() {
      var fore;
      if (String.isNullOrEmpty(this.params.foreground)) {
        return;
      }
      fore = KDCore.Sprite.FromImg(this.params.foreground, this.rootImageFolder());
      return this.add(fore);
    };
    _._loadMask = function() {
      var mask;
      if (String.isNullOrEmpty(this.params.mask)) {
        return;
      }
      mask = KDCore.Sprite.FromImg(this.params.mask, this.rootImageFolder());
      this.mask = mask;
      return this.add(mask);
    };
    // * Если что-то было до готовности, нарисовать
    _._onReady = function() {
      this.drawGauge(this._lastValue);
    };
    _._drawGauge = function(percent) {
      if (this.fillLayer == null) {
        return;
      }
      this.fillLayer.clear();
      if (this.isVertical()) {
        return this._drawVerGauge(percent);
      } else {
        return this._drawHorGauge(percent);
      }
    };
    _._drawHorGauge = function(percent) {
      var w;
      w = this.fillBitmap.width * percent;
      return this.fillLayer.b().blt(this.fillBitmap, 0, 0, w, this.fillLayer.height, 0, 0);
    };
    _._drawVerGauge = function(percent) {
      var h, hy;
      h = this.fillBitmap.height * percent;
      hy = this.fillBitmap.height - h;
      this.fillLayer.b().blt(this.fillBitmap, 0, 0, this.fillLayer.width, h, 0, hy);
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UIIcon;
    Sprite_UIIcon = class Sprite_UIIcon extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          index: 0,
          size: 32,
          rootImageFolder: null //?optional
        };
      }

      draw() {
        return this.drawIcon(...arguments);
      }

      drawIcon(index = 0, noSmoth = false) {
        this._lastValue = index;
        return this._drawIcon(index, noSmoth);
      }

    };
    KDCore.UI.Sprite_UIIcon = Sprite_UIIcon;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIIcon.prototype;
    //$[OVER]
    _._createContent = function() {
      this._createIcon();
      return this._drawIcon(this.params.index);
    };
    _._createIcon = function() {
      this._icon = KDCore.Sprite.FromBitmap(this.params.size, this.params.size);
      this.add(this._icon);
      return this._onReady();
    };
    _._onReady = function() {
      return this.drawIcon(this._lastValue);
    };
    _._drawIcon = function(index, noSmoth = false) {
      this._icon.clear();
      if (KDCore.SDK.isString(index)) {
        this._drawImageIcon(index, noSmoth);
      } else {
        if (index <= 0) {
          return;
        }
        this._icon.drawIcon(0, 0, index, this.params.size, noSmoth);
      }
    };
    _._drawImageIcon = function(imageName, noSmoth = false) {
      return KDCore.Utils.loadImageAsync(this.rootImageFolder(), imageName).then((bitmap) => {
        return this._icon.drawIcon(0, 0, bitmap, this.params.size, noSmoth);
      });
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UIImage;
    Sprite_UIImage = class Sprite_UIImage extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          image: "",
          rootImageFolder: null //?optional
        };
      }

      draw() {
        return this.drawImage(...arguments);
      }

      drawImage(image) {
        return this._drawImage(image);
      }

    };
    KDCore.UI.Sprite_UIImage = Sprite_UIImage;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIImage.prototype;
    //$[OVER]
    _._createContent = function() {
      return this._drawImage(this.params.image);
    };
    _._drawImage = function(image) {
      this._clearImage();
      if (!String.isNullOrEmpty(image)) {
        this._image = KDCore.Sprite.FromImg(image, this.rootImageFolder());
        this.add(this._image);
      }
    };
    _._clearImage = function() {
      if (this._image == null) {
        return;
      }
      this._image.visible = false;
      this.removeChild(this._image);
      return this._image = null;
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UIRect;
    Sprite_UIRect = class Sprite_UIRect extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          size: {
            w: 60,
            h: 20
          },
          fillColor: "#FFFFFF".toCss(),
          fillOpacity: 255,
          borderColor: "#000000".toCss(),
          borderThickness: 1,
          borderOpacity: 255
        };
      }

      draw() {
        return this.fill(...arguments);
      }

      fill(color, opacity = 255) {
        return this._fill(color, opacity);
      }

      drawBorder(color, thickness = 1, opacity = 255) {
        return this._drawBorder(color, thickness, opacity);
      }

    };
    KDCore.UI.Sprite_UIRect = Sprite_UIRect;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIRect.prototype;
    //$[OVER]
    _._createContent = function() {
      if (String.any(this.params.fillColor)) {
        this._createFill();
        this.fill(this.params.fillColor, this.params.fillOpacity);
      }
      if (String.any(this.params.borderColor) && this.params.borderThickness > 0) {
        this._createBorder();
        return this.drawBorder(this.params.borderColor, this.params.borderThickness, this.params.borderOpacity);
      }
    };
    _._createFill = function() {
      this._fillSpr = KDCore.Sprite.FromBitmap(this.params.size.w, this.params.size.h);
      return this.addChild(this._fillSpr);
    };
    _._createBorder = function() {
      this._borderSprite = KDCore.Sprite.FromBitmap(this.params.size.w, this.params.size.h);
      return this.addChild(this._borderSprite);
    };
    _._fill = function(color, opacity) {
      if (this._fillSpr == null) {
        return;
      }
      this._fillSpr.fillAll(color);
      this._fillSpr.opacity = opacity;
    };
    _._drawBorder = function(color, thickness, opacity) {
      var b;
      if (this._borderSprite == null) {
        return;
      }
      this._borderSprite.clear();
      b = this._borderSprite.b();
      // * Top line
      b.fillRect(0, 0, b.width, thickness, color);
      // * Bottom line
      b.fillRect(0, b.height - thickness, b.width, thickness, color);
      // * Left line
      b.fillRect(0, 0, thickness, b.height, color);
      // * Right line
      b.fillRect(b.width - thickness, 0, thickness, b.height, color);
      return this._borderSprite.opacity = opacity;
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {    //rev 17.11.22
    var Sprite_UIText;
    Sprite_UIText = class Sprite_UIText extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          size: {
            w: 60,
            h: 20
          },
          alignment: "center",
          font: {
            face: null,
            size: 18,
            italic: false
          },
          margins: {
            x: 0,
            y: 0
          },
          outline: {
            color: null,
            width: 2
          },
          textColor: "#FFFFFF".toCss(),
          // ? can be Null or not exists
          shadow: {
            color: "#000",
            opacity: 200,
            margins: {
              x: 1,
              y: 1
            }
          }
        };
      }

      //?DYNAMIC
      // * Сперва рисуем по готовности, а как загрузился спрайт, меняем
      drawText(text) {
        return this._drawTextWhenReady(text);
      }

      // * Сборка текста с учётом формата
      // * Заменить вхождения %1, %2 на значения параметров
      drawTextWithFormat(/*format string, arguments parameters... */) {
        var text;
        text = this._convertFormatedString(...arguments);
        this.drawText(text);
      }

      // * Пишет текст с определённым цветом (один раз)
      drawTextColor(text, colorCss) {
        if (this._textSpr == null) {
          return;
        }
        this._textSpr.b().textColor = colorCss;
        this.drawText(text);
        this._textSpr.b().textColor = this.params.textColor;
      }

    };
    KDCore.UI.Sprite_UIText = Sprite_UIText;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIText.prototype;
    //$[OVER]
    _._createContent = function() {
      if (this.params.shadow != null) {
        this._createShadow();
      }
      return this._createTextSprite();
    };
    _._createTextSprite = function() {
      this._textSpr = KDCore.Sprite.FromParams(this.params);
      this._textSpr.onReady(this._onReady.bind(this));
      return this.add(this._textSpr);
    };
    // * Выполнить по готовности
    _._onReady = function() {
      // * Переключить метод, так как уже готов
      this.drawText = this._drawText;
      // * Написать то что нужно было до готовности (если есть)
      if (this._drawOnReady == null) {
        return;
      }
      this.drawText(this._drawOnReady);
      this._drawOnReady = null;
    };
    _._drawText = function(text) {
      if (this._textSpr == null) {
        return;
      }
      this._textSpr.clear();
      if (text != null) {
        this._textSpr.drawTextFull(text);
      }
      if (this._shadowSpr != null) {
        this._shadowSpr.clear();
        if (text != null) {
          this._shadowSpr.drawTextFull(text);
        }
      }
    };
    // * Написать текст когда будет готов
    _._drawTextWhenReady = function(text) {
      this._drawOnReady = text;
      return this._drawText(text);
    };
    
    // * Заменить вхождения %1, %2 на значения параметров
    _._convertFormatedString = function(/*text, args...*/) {
      var e, i, j, ref, text;
      try {
        text = arguments[0];
        for (i = j = 1, ref = arguments.length; (1 <= ref ? j < ref : j > ref); i = 1 <= ref ? ++j : --j) {
          try {
            if (arguments[i] == null) {
              continue;
            }
            text = text.replace("%" + i, arguments[i]);
          } catch (error) {
            e = error;
            KDCore.warning(e);
            text = "[wrong format text input]";
          }
        }
        return text;
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return "[wrong format text input]";
      }
    };
    _._createShadow = function() {
      this._shadowSpr = KDCore.Sprite.FromParams(this.params);
      this._shadowSpr.bitmap.textColor = this.params.shadow.color;
      this._shadowSpr.opacity = this.params.shadow.opacity;
      this._shadowSpr.x += this.params.shadow.margins.x;
      this._shadowSpr.y += this.params.shadow.margins.y;
      return this.add(this._shadowSpr);
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {    //rev 30.12.21
    var Sprite_UITextExt;
    Sprite_UITextExt = class Sprite_UITextExt extends KDCore.UI.Sprite_UIText {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          size: {
            w: 200,
            h: 60
          },
          font: {
            face: null,
            size: 14,
            italic: false
          },
          margins: {
            x: 0,
            y: 0
          },
          // * новые параметры (KDCore 2.7)
          //?null могут быть
          singleLine: false,
          forceCentered: false
        };
      }

      //$[OVER]
      // * Данный метод не поддерживается, так как тут основа не Sprite, а Window
      drawTextColor() {
        return this.drawText(...arguments);
      }

    };
    KDCore.UI.Sprite_UITextExt = Sprite_UITextExt;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UITextExt.prototype;
    //$[OVER]
    _._createTextSprite = function() {
      var rect;
      rect = new Rectangle(0, 0, this.params.size.w, this.params.size.h);
      this._textSpr = new KDCore.Window_ExtTextLineBase(rect, this.params.font);
      this._textSpr.x = this.params.margins.x || 0;
      this._textSpr.y = this.params.margins.y || 0;
      this.add(this._textSpr);
      // * На следующий кадр, чтобы не было потери текста (опасно)
      //setTimeout (=> @_onReady() ), 10
      this._onReady(); // * Сразу
    };
    
    //$[OVER]
    _._drawText = function(text) {
      if (this._textSpr == null) {
        return;
      }
      this._textSpr.contents.clear();
      if (this.params.forceCentered === true) {
        this._textSpr.drawTextExInCenter(text, 0, 0, this._textSpr.width, this._textSpr.height);
      } else {
        if (this.params.singleLine === true) {
          this._textSpr.drawTextEx(text, 0, 0, this._textSpr.width);
        } else {
          // * По умолчанию
          this._textSpr.drawTextExWithWordWrap(text, 0, 0, this._textSpr.width);
        }
      }
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UITextWithBack;
    Sprite_UITextWithBack = class Sprite_UITextWithBack extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          text: {
            visible: true,
            size: {
              w: 60,
              h: 20
            },
            alignment: "center",
            font: {
              face: null,
              size: 18,
              italic: false
            },
            margins: {
              x: 0,
              y: 0
            },
            outline: {
              color: null,
              width: 2
            },
            textColor: "#000000".toCss()
          },
          rect: {
            visible: true,
            size: {
              w: 60,
              h: 20
            },
            fillColor: "#FFFFFF".toCss(),
            fillOpacity: 255,
            borderColor: "#000000".toCss(),
            borderThickness: 1,
            borderOpacity: 255
          },
          textMargins: {
            x: 0,
            y: 0
          }
        };
      }

      draw() {
        return this.drawText(...arguments);
      }

      // * Aргументы смотри в Sprite_UIText
      drawText() {
        return this.text.draw(...arguments);
      }

      drawTextColor() {
        return this.text.drawTextColor(...arguments);
      }

      // * Аргументы смотри в Sprite_UIRect
      fill() {
        return this.rect.fill(...arguments);
      }

      drawBorder() {
        return this.rect.drawBorder(...arguments);
      }

      //$[OVER]
      isUnderMouse() {
        return this.rect.isUnderMouse();
      }

    };
    KDCore.UI.Sprite_UITextWithBack = Sprite_UITextWithBack;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UITextWithBack.prototype;
    //$[OVER]
    _._createContent = function() {
      this._createRect();
      return this._createText();
    };
    _._createRect = function() {
      this.rect = new KDCore.UI.Sprite_UIRect(this.params.rect);
      return this.addChild(this.rect);
    };
    _._createText = function() {
      var x, y;
      this.text = new KDCore.UI.Sprite_UIText(this.params.text);
      ({x, y} = this.params.textMargins);
      this.text.move(x, y);
      return this.addChild(this.text);
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UIColorGauge;
    Sprite_UIColorGauge = class Sprite_UIColorGauge extends KDCore.UI.Sprite_UIGauge {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          size: {
            w: 100,
            h: 40
          },
          fill: "#FFFFFF", // * В отличии от Gauge, тут цвет, а не картинка
          foreground: "", // картинка
          mask: "", // картинка
          backColor: "#000000".toCss(),
          backOpacity: 255,
          vertical: false,
          rootImageFolder: null //?optional
        };
      }

    };
    KDCore.UI.Sprite_UIColorGauge = Sprite_UIColorGauge;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIColorGauge.prototype;
    //$[OVER]
    // * Заместо изображения используем простой Bitmap с заливкой цвета
    _._loadFillImage = function() {
      var fillBitmap;
      fillBitmap = new Bitmap(this.params.size.w, this.params.size.h);
      fillBitmap.fillAll(this.params.fill);
      this._createParts(fillBitmap);
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {    // * Данный UI Элемент является только контейнером
    // * Он ничего не рисует, нужно добавлять в него
    // * контент методом addContent

    //rev 17.11.22
    var Sprite_UITooltip;
    Sprite_UITooltip = class Sprite_UITooltip extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
        this.opacity = 0;
      }

      isTooltipActive() {
        return (this._opThread != null) || (this._opChanger != null) || this.opacity > 0;
      }

      activateTooltip(x, y, parent) {
        if (this.isTooltipActive()) {
          return;
        }
        this.deactivateTooltip();
        this.move(x, y);
        this._opThread = new KDCore.TimedUpdate(this.params.delay, this.showTooltip.bind(this));
        if (!this.params.isGlobal && (parent != null)) {
          parent.addChild(this);
        } else {
          // * Always on Top on Scene  (if Global)
          SceneManager._scene.addChild(this);
        }
      }

      deactivateTooltip() {
        this._opThread = null;
        this._opChanger = null;
        return this.opacity = 0;
      }

      showTooltip() {
        this._opThread = null;
        this.appear(this.params.opacityChangeStep);
        if (this.params.cursorRelative === true) {
          return this.toCursor();
        }
      }

      update() {
        var ref;
        super.update();
        if ((ref = this._opThread) != null) {
          ref.update();
        }
        if (this.isTooltipActive() && this.params.cursorRelative === true) {
          return this.toCursor();
        }
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          delay: 30,
          opacityChangeStep: 35,
          margins: {
            x: 8,
            y: 8
          },
          isGlobal: true,
          cursorRelative: true
        };
      }

      toCursor() {
        var x, y;
        ({x, y} = this.params.margins);
        return this.move(TouchInput.x + x, TouchInput.y + y);
      }

      // * Основной метод, нужно добавить контент
      addContent(content) {
        return this.add(content);
      }

    };
    KDCore.UI.Sprite_UITooltip = Sprite_UITooltip;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UITooltip.prototype;
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var ALIAS__processEscapeCharacter, _;
  //@[DEFINES]
  _ = Window_Base.prototype;
  //@[ALIAS]
  ALIAS__processEscapeCharacter = _.processEscapeCharacter;
  _.processEscapeCharacter = function(code, textState) {
    switch (code) {
      case 'CHEX':
        this.pProcessColorChangeHex(this.pObtainEscapeParamHexColor(textState));
        break;
      case 'ISZ':
        this.pProcessDrawIconSized(this.pObtainEscapeParamIconArr(textState), textState);
        break;
      case 'PSZ':
        this.pProcessDrawPictureSized(this.pObtainEscapeParamImgArr(textState), textState, false);
        break;
      case 'PSB':
        this.pProcessDrawPictureSized(this.pObtainEscapeParamImgArr(textState), textState, true);
        break;
      default:
        ALIAS__processEscapeCharacter.call(this, code, textState);
    }
  };
  //?NEW
  _.pObtainEscapeParamHexColor = function(textState) {
    var arr, regExp, textPart;
    regExp = /^\[(#?([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})\]/;
    textPart = textState.text.slice(textState.index);
    arr = regExp.exec(textPart);
    if (arr != null) {
      textState.index += arr[0].length;
      return arr[1];
    } else {
      return "";
    }
  };
  //?NEW
  _.pObtainEscapeParamIconArr = function(textState) {
    var arr, params, regExp, textPart;
    regExp = /^\[(\d+,\s*\d+,\s*-?\d+,\s*-?\d+)\]/;
    textPart = textState.text.slice(textState.index);
    arr = regExp.exec(textPart);
    if (arr != null) {
      textState.index += arr[0].length;
      if (arr[1] != null) {
        params = arr[1].split(",").map(function(i) {
          return parseInt(i.trim());
        });
        return params;
      }
    }
    return [];
  };
  //?NEW
  _.pObtainEscapeParamImgArr = function(textState) {
    var arr, params, regExp, textPart;
    regExp = /^\[(\w+,\s*\d+,\s*\d+,\s*-?\d+,\s*-?\d+)\]/;
    textPart = textState.text.slice(textState.index);
    arr = regExp.exec(textPart);
    if (arr != null) {
      textState.index += arr[0].length;
      if (arr[1] != null) {
        params = arr[1].split(",").map(function(i) {
          if (isFinite(i)) {
            return parseInt(i.trim());
          } else {
            return i;
          }
        });
        return params;
      }
    }
    return [];
  };
  //?NEW
  _.pProcessColorChangeHex = function(colorHex) {
    var e;
    try {
      this.changeTextColor(colorHex);
    } catch (error) {
      e = error;
      KDCore.warning(e);
      this.resetTextColor();
    }
  };
  //?NEW
  //?params: [INDEX, SIZE, DX, DY]
  _.pProcessDrawIconSized = function(params, textState) {
    var dx, dy, e, iconIndex, size, staticMargin, x, y;
    try {
      if (params == null) {
        return;
      }
      if (params.isEmpty()) {
        return;
      }
      size = params[1];
      if (params[1] == null) {
        if (KDCore.isMZ()) {
          size = ImageManager.iconWidth;
        } else {
          size = Window_Base._iconWidth;
        }
      }
      if (params[2] == null) {
        params[2] = 0;
      }
      if (params[3] == null) {
        params[3] = 0;
      }
      iconIndex = params[0];
      dx = params[2];
      dy = params[3];
      staticMargin = 2;
      x = textState.x + staticMargin + dx;
      y = textState.y + staticMargin + dy;
      if (KDCore.isMZ()) {
        if (textState.drawing === true) {
          // * Только в режиме рисования
          this.contents.drawIcon(x, y, iconIndex, size);
        }
      } else {
        this.contents.drawIcon(x, y, iconIndex, size);
      }
      textState.x += size + (staticMargin * 2) + dx;
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  //?NEW
  //?params: [NAME, W, H, DX, DY]
  _.pProcessDrawPictureSized = function(params, textState, isUnderText = false) {
    var drawBitmap, drawProcess, e, height, name, source, width, x, y;
    try {
      if (params == null) {
        return;
      }
      if (params.isEmpty()) {
        return;
      }
      name = params[0];
      if (!String.any(name)) {
        return;
      }
      width = params[1];
      height = params[2];
      if (params[3] == null) {
        params[3] = 0;
      }
      if (params[4] == null) {
        params[4] = 0;
      }
      x = textState.x + 2 + params[3];
      y = textState.y + 2 + params[4];
      drawBitmap = this.contents;
      source = this.pGetSourceImageForDrawPictureSized(name);
      if ((KDCore.isMZ() && textState.drawing === true) || KDCore.isMV()) {
        drawProcess = function() {
          var e;
          try {
            if (drawBitmap == null) {
              return;
            }
            return drawBitmap.drawOnMe(source, x, y, width, height);
          } catch (error) {
            e = error;
            return KDCore.warning(e);
          }
        };
        source.addLoadListener(drawProcess);
      }
      if (isUnderText !== true) {
        // * Вариант, что текст не будет "перескакивать" за ширину картинки а пойдёт поверх (т.е. фоновая картинка)
        // * Если картине не preload, то может "вылезти" на текст потом, так как рисоваться будет позже
        textState.x += width + 4 + params[3];
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  // * Данный метод вынесен отдельно, чтобы можно было переопределять папки
  return _.pGetSourceImageForDrawPictureSized = function(name) {
    return ImageManager.loadPicture(name);
  };
});


// Generated by CoffeeScript 2.6.1



// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var FloatingWindow;
  
    // * Общий класс для всех окон на карте
  /*parameters
      {
          draggable: true,
          closeButton: true,
          moveToCenter: true,
          alwaysOnTop: true,
          header: true
      }
  */
  FloatingWindow = class FloatingWindow extends KDCore.Sprite {
    constructor(mainParent, windowW, windowH, parameters) {
      super();
      this.mainParent = mainParent;
      this.windowW = windowW;
      this.windowH = windowH;
      this.parameters = parameters;
      this._init();
      return;
    }

    static StaticSettings() {
      return {
        draggable: false,
        closeButton: false,
        moveToCenter: false,
        alwaysOnTop: false,
        header: false
      };
    }

    // * Статическое окно с дочерним
    static StaticWindow(parent, sub) {
      var p, w;
      p = KDCore.FloatingWindow.StaticSettings();
      w = new KDCore.FloatingWindow(parent, sub.width, sub.height, p);
      w.setSubWindow(sub);
      w.open();
      return w;
    }

    isActive() {
      return this.visible === true;
    }

    isReady() {
      return this._isReady === true;
    }

    isMouseIn() {
      return this.inPosition(TouchInput);
    }

    isOpen() {
      return this.isActive();
    }

    // * Дочернее окно (если есть)
    sub() {
      return this._subw;
    }

    setOnReadyHandler(_readyHandler) {
      this._readyHandler = _readyHandler;
      if ((this._readyHandler != null) && this._isReady === true) {
        return this._readyHandler();
      }
    }

    isDraggable() {
      return this._isDraggable === true && (this._headerSpr != null) && this._headerSpr.visible === true && this.isOpen();
    }

    setCloseHandler(_closeHandler) {
      this._closeHandler = _closeHandler;
    }

    callCloseHandler() {
      if (this._closeHandler != null) {
        return this._closeHandler();
      }
    }

    setDraggingHandler(_dragHandler) {
      this._dragHandler = _dragHandler;
    }

    setDragEndHandler(_dragEndHandler) {
      this._dragEndHandler = _dragEndHandler;
    }

    hideHeader() {} //TODO:

    hideCloseButton() {} //TODO:

    
      // * Сдвиг заголовка по X, чтобы рамку не задевал
    headerMarginX() {
      return 2;
    }

    // * Сдвиг заголовка по Y, чтобы рамку не задевал
    headerMarginY() {
      return 0;
    }

    // * Стандартная позиция кнопки "закрыть"
    closeButtonPosition() {
      return {
        x: this.width - 24,
        y: 4
      };
    }

    open() {
      if (this.isOpen()) {
        return;
      }
      this._open();
      this._afterOpen();
    }

    close() {
      if (!this.isOpen()) {
        return;
      }
      this._close();
      this._afterClose();
    }

    rootImageFolder() {
      return "Alpha/Windows";
    }

    update() {
      super.update();
      this._updateMouseCheckThread();
      this._updateDragging();
    }

    // * Добавить спрайт на специальный слой контента
    addContent(sprite) {
      return this._contentLayer.addChild(sprite);
    }

    // * Добавить дочернее окно
    setSubWindow(w) {
      this._subw = w;
      this.addContent(w);
    }

    destroy() {
      this._close();
      return Sprite.prototype.destroy.call(this);
    }

  };
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = FloatingWindow.prototype;
    _._init = function() {
      var ref;
      // * Окно всегда закрыто
      this.visible = false;
      // * Контент прогрузился?
      this._isReady = false;
      this._applyParameters();
      if (this._isAlwaysOnTop === false) {
        // * Если не всегда поверх окон, то добавляем сразу к родителю (один раз)
        if ((ref = this.mainParent) != null) {
          ref.addChild(this);
        }
      }
      this._initFloatingSystem();
      this._createLayers();
      this._loadWindowFrame();
    };
    // * Тут ничего не создавать, не двигать, так как
    // * конент создаётся Async, см. метод _createCustomElements
    _._applyParameters = function() {
      var p;
      this._applyDefaults();
      if (this.parameters == null) {
        return;
      }
      p = this.parameters;
      if (p.draggable != null) {
        this._isDraggable = p.draggable;
      }
      if (p.moveToCenter != null) {
        this._isMoveToCenter = p.moveToCenter;
      }
      if (p.header != null) {
        this._isHeaderVisible = p.header;
      }
      if (p.closeButton != null) {
        this._isHaveCloseButton = p.closeButton;
      }
      if (p.alwaysOnTop != null) {
        this._isAlwaysOnTop = p.alwaysOnTop;
      }
    };
    _._applyDefaults = function() {
      // * Окно можно перетаскивать мышкой (по умолчанию - да)
      this._isDraggable = true;
      this._isMoveToCenter = true;
      this._isHeaderVisible = true;
      this._isHaveCloseButton = true;
      this._isAlwaysOnTop = true;
    };
    _._initFloatingSystem = function() {
      if ($gameTemp._floatingWindows == null) {
        // * Создаём массив окон, он нужен для правильного
        // закрытия окон (по очереди) и перемещения drag and drop
        // с учётом верхнего окна
        $gameTemp._floatingWindows = [];
      }
      // * Вспомогательная переменная, чтобы не вызывать методы каждый кадр
      this._mouseIn = false;
      // * Тоже вспомогательная переменная
      this._dragging = false;
    };
    _._moveToStartPosition = function() {
      if (this._isMoveToCenter === true) {
        return this.moveToCenter(Graphics.width / 2, Graphics.height / 2);
      }
    };
    _._closeButtonClick = function() {
      // * При исчезании, кнопка не успевает себя "удалить"
      $gameTemp.kdButtonUnderMouse = null;
      this.callCloseHandler();
      return this.close();
    };
    (function() {      // * DRAGGING
      // -----------------------------------------------------------------------
      _._updateDragging = function() {
        if (!this.isDraggable()) {
          return;
        }
        // * Если мы уже двигаем окно, но мышка вышла за границы, то можно дальше двигать
        // * Только если мышка не в окне и не двигали ранее, то не проверяем
        if (this._mouseIn === false && this._dragging === false) {
          return;
        }
        // * Если существует объект который сейчас dragging
        if ($gameTemp.pkdDraggableInstance != null) {
          // * Если этот объект не этот объект, то выходим из метода
          if ($gameTemp.pkdDraggableInstance !== this) {
            return;
          }
        }
        if (TouchInput.isLongPressed()) {
          if (this._dragging === false) {
            this._onDragStart();
          } else {
            this._onDragging();
          }
        } else {
          this._stopDragging();
        }
      };
      _._onDragStart = function() {
        // * Проверка, в области Header или нет
        if (!this._isMouseInHeader()) {
          return;
        }
        // * Разница в координатах курсора и объекта, чтобы убрать эффект "прыжка"
        this.opacity = 200;
        this._deltaXY = this.getDeltaXY();
        this._dragging = true;
        // * Устанавливаем глобальную ссылку на объект перемещения
        $gameTemp.pkdDraggableInstance = this;
      };
      _.getDeltaXY = function() {
        var p;
        p = new KDCore.Point(this.x, this.y);
        return p.delta(TouchInput);
      };
      _._onDragging = function() {
        // * Защита от перетаскивания за края экрана
        if (!this._isNewMousePositionOnScreen()) {
          return;
        }
        this.move(TouchInput.x - this._deltaXY.x, TouchInput.y - this._deltaXY.y);
        if (this._dragHandler != null) {
          return this._dragHandler();
        }
      };
      _._stopDragging = function() {
        if (this._dragging === true) {
          this._dragging = false;
          this.opacity = 255;
          this._clearDraggableGlocalInstance();
          if (this._dragEndHandler != null) {
            this._dragEndHandler();
          }
        }
      };
      // * Освобождаем глобальную ссылку
      _._clearDraggableGlocalInstance = function() {
        if ($gameTemp.pkdDraggableInstance === this) {
          return $gameTemp.pkdDraggableInstance = null;
        }
      };
      _._isMouseInHeader = function() {
        if (this._headerSpr == null) {
          return false;
        }
        return this._headerSpr.isContainsPoint(TouchInput);
      };
      _._isNewMousePositionOnScreen = function() {
        return KDCore.Utils.isPointInScreen(TouchInput, 10);
      };
    })();
    (function() {      // -----------------------------------------------------------------------

      // * CREATE ELEMENTS
      // -----------------------------------------------------------------------
      
      // * Слои нужны, так как изображения загружаються асинхронно
      _._createLayers = function() {
        this._mainLayer = new Sprite();
        this._contentLayer = new Sprite();
        this._headerLayer = new Sprite();
        this._closeButtonLayer = new Sprite();
        this.addChild(this._mainLayer);
        this.addChild(this._contentLayer);
        this.addChild(this._headerLayer);
        this.addChild(this._closeButtonLayer);
      };
      _._loadWindowFrame = function() {
        return KDCore.Utils.loadImageAsync(this.rootImageFolder(), "windowFrame").then(this._createWindow.bind(this));
      };
      _._createWindow = function(frameImage) {
        this.bitmap = new Bitmap(this.windowW, this.windowH);
        this.wFrame = new KDCore.Sprite_TilingFrame(this.windowW, this.windowH, frameImage);
        this._mainLayer.addChild(this.wFrame);
        this._createParts();
      };
      _._createParts = function() {
        this._loadHeader();
        if (this._isHaveCloseButton === true) {
          this._createCloseButton();
        }
        this._moveToStartPosition();
        this._createCustomElements();
        // * Окно готово
        this._isReady = true;
        if (this._readyHandler != null) {
          this._readyHandler();
        }
      };
      _._loadHeader = function() {
        return KDCore.Utils.loadImageAsync(this.rootImageFolder(), "headerLine").then(this._createHeader.bind(this));
      };
      _._createHeader = function(headerLineImage) {
        var w;
        w = this.windowW - (this.headerMarginX() * 2);
        this._headerSpr = new KDCore.Sprite_TilingLine(w, headerLineImage.height, headerLineImage);
        this._headerSpr.x = this.headerMarginX();
        this._headerSpr.y = this.headerMarginY();
        this._headerLayer.addChild(this._headerSpr);
        if (this._isHeaderVisible === true) {
          // * Сдвигаем контент, чтобы было начало под заголовком
          this._contentLayer.y += headerLineImage.height + this.headerMarginY();
        } else {
          this._headerSpr.visible = false;
        }
      };
      _._createCloseButton = function() {
        this._closeButton = new KDCore.ButtonM("windowCloseButton", false, this.rootImageFolder());
        this._closeButtonLayer.addChild(this._closeButton);
        this._closeButton.move(this.closeButtonPosition());
        this._closeButton.addClickHandler(this._closeButtonClick.bind(this));
      };
      //%[FOR CHILDRENS]
      // * Наследники создают свои элементы в этом методе
      // * Есть специальный метод addContent()
      _._createCustomElements = function() {}; // * EMPTY
    })();
    (function() {      // -----------------------------------------------------------------------

      // * MOUSE
      // -----------------------------------------------------------------------
      
      // * Определение если мышка в области окна
      //TODO: Есть проблема при открытии окна сразу под курсором
      _._registerMouseInOut = function() {
        if (!this.isOpen()) {
          return;
        }
        if (this.isMouseIn()) {
          if (this._mouseIn === false) {
            this._mouseIn = true;
            this._onMouseIn();
          }
        } else {
          if (this._mouseIn === true) {
            this._mouseIn = false;
            this._onMouseOut();
          }
        }
      };
      // * Используется похожая система что и в KDCore.ButtonM
      _._onMouseIn = function() {
        return $gameTemp.floatingWindowUnderMouse = this;
      };
      _._onMouseOut = function() {
        if ($gameTemp.floatingWindowUnderMouse === this) {
          return $gameTemp.floatingWindowUnderMouse = null;
        }
      };
      // * Будем проверять мышка ли в окне только при открытом окне
      _._createMouseCheckThread = function() {
        this._mouseCheckThread = new KDCore.TimedUpdate(1, this._registerMouseInOut.bind(this));
        this._updateMouseCheckThread = () => {
          return this._mouseCheckThread.update();
        };
        return this._mouseCheckThread.call();
      };
      // * Когда окно закрывается, никаких проверок, обнуляем метод
      _._destroyMouseCheckThread = function() {
        this._mouseCheckThread = null;
        return this._updateMouseCheckThread = function() {};
      };
      //?DYNAMIC
      _._updateMouseCheckThread = function() {}; // * EMPTY
    })();
    (function() {      // -----------------------------------------------------------------------

      // * OPEN OR CLOSE
      // -----------------------------------------------------------------------
      _._open = function() {
        var ref, ref1;
        this.visible = true;
        if ((ref = $gameTemp._floatingWindows) != null) {
          ref.push(this);
        }
        if (this._isAlwaysOnTop === true) {
          // * Окно, которое открывается, всегда снова выше остальных (опция)
          if ((ref1 = this.mainParent) != null) {
            ref1.addChild(this);
          }
        }
        return this._createMouseCheckThread();
      };
      _._afterOpen = function() {}; // * EMPTY
      _._close = function() {
        this.visible = false;
        if (this._isAlwaysOnTop === true) {
          this.removeFromParent();
        }
        this._clearDraggableGlocalInstance();
        $gameTemp._floatingWindows.delete(this);
        this._onMouseOut();
        return this._destroyMouseCheckThread();
      };
      _._afterClose = function() {}; // * EMPTY
    })();
  })();
  (function() {    // ■ END PRIVATE.coffee
    //---------------------------------------------------------------------------

    // * Если окно под курсором, нельзя нажимать на карте для движения игрока
    // -----------------------------------------------------------------------
    (function() {      //╒═════════════════════════════════════════════════════════════════════════╛
      // ■ Scene_Map.coffee
      //╒═════════════════════════════════════════════════════════════════════════╛
      //---------------------------------------------------------------------------
      var ALIAS__isAnyButtonPressed, ALIAS__processMapTouch, _;
      
      //@[DEFINES]
      _ = Scene_Map.prototype;
      if (KDCore.isMZ()) {
        //@[ALIAS]
        ALIAS__isAnyButtonPressed = _.isAnyButtonPressed;
        _.isAnyButtonPressed = function() {
          if ($gameTemp.floatingWindowUnderMouse != null) {
            return true;
          } else {
            return ALIAS__isAnyButtonPressed.call(this);
          }
        };
      } else {
        //@[ALIAS]
        ALIAS__processMapTouch = _.processMapTouch;
        _.processMapTouch = function() {
          if ($gameTemp.floatingWindowUnderMouse != null) {
            return;
          }
          return ALIAS__processMapTouch.call(this);
        };
      }
    })();
  })();
  //@[EXTEND]
  // ■ END Scene_Map.coffee
  //---------------------------------------------------------------------------
  return KDCore.FloatingWindow = FloatingWindow;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var HUI;
  // * Html UI Manager
  // * Набор инструментов для работы с HTML элементами интерфейса
  HUI = function() {};
  (function() {
    var _;
    //@[DEFINES]
    _ = HUI;
    _.init = function() {
      // * Данный набор инструментов могут использовать многие плагины, поэтому проверка
      if (this.isInited()) {
        return;
      }
      this._createMainParentInHtml();
      this._extendGraphicsClass();
      this.refresh();
    };
    // * Был ли создан (инициализирован) основной элемент
    _.isInited = function() {
      return this.parent() != null;
    };
    // * Основной элемент родитель для всех элементов UI
    _.parent = function() {
      return this._parent;
    };
    _.refresh = function() {
      if (!this.isInited()) {
        return;
      }
      Graphics._centerElement(this._parent);
      this._parent.style.zIndex = 2;
      this._parent.style.width = Graphics._canvas.style.width;
      this._parent.style.height = Graphics._canvas.style.height;
    };
    _.addCSS = function(name, folder = "css") {
      var head;
      if (!this.isInited()) {
        this.init();
      }
      head = document.getElementsByTagName("head")[0];
      if (head != null) {
        head.insertAdjacentHTML("beforeend", "<link rel=\"stylesheet\" href=\"$0/$1.css\" />".replace("$0", folder).replace("$1", name));
      }
    };
    _.addElement = function(id, html, classes = null) {
      var cls, element, i, len;
      if (!this.isInited()) {
        this.init();
      }
      element = document.createElement("div");
      element.id = id;
      element.innerHTML = html;
      if (classes != null) {
        for (i = 0, len = classes.length; i < len; i++) {
          cls = classes[i];
          element.classList.add(cls);
        }
      }
      this._parent.appendChild(element);
      return element;
    };
    // * Может быть NULL
    _.getElement = function(id) {
      return document.getElementById(id);
    };
    _.removeElement = function(element) {
      if (element == null) {
        return;
      }
      if (KDCore.SDK.isString(element)) {
        this.removeElementById(element);
      } else {
        this.removeElementById(element.id);
      }
    };
    _.removeElementById = function(elementId) {
      var element;
      if (!this.isInited()) {
        return;
      }
      element = this.getElement(elementId);
      if (element != null) {
        this._parent.removeChild(element);
      }
    };
    // * PRIVATE ------------------------------------------------------------------
    _._createMainParentInHtml = function() {
      this._parent = document.createElement("div");
      this._parent.id = "KDCoreMain";
      document.body.appendChild(this._parent);
    };
    _._extendGraphicsClass = function() {
      var ALIAS___updateCanvas;
      //@[ALIAS]
      ALIAS___updateCanvas = Graphics._updateCanvas;
      Graphics._updateCanvas = function() {
        ALIAS___updateCanvas.call(this);
        return KDCore.HUI.refresh();
      };
    };
  })();
  //@[EXTEND]
  return KDCore.HUI = HUI;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var ALIAS___onMouseUp, ALIAS___onRightButtonDown, ALIAS__clear, ALIAS__update, _;
  // * Right mouse pressed
  // * Определение когда правая (вторая) кнопка мыши зажата и удерживается

  //@[DEFINES]
  _ = TouchInput;
  //@[ALIAS]
  ALIAS__clear = _.clear;
  _.clear = function() {
    ALIAS__clear.call(this);
    this._kdMousePressed2 = false;
    this._kdPressedTime2 = 0;
  };
  //@[ALIAS]
  ALIAS___onRightButtonDown = _._onRightButtonDown;
  _._onRightButtonDown = function(event) {
    var check;
    ALIAS___onRightButtonDown.call(this, event);
    // * Это значит что ALIAS метод прошёл (верные X и Y в Canvas)
    if (KDCore.isMZ()) {
      check = this._newState.cancelled === true;
    } else {
      check = this._events.cancelled === true;
    }
    if (check === true) {
      this._kdMousePressed2 = true;
      this._kdPressedTime2 = 0;
    }
  };
  //@[ALIAS]
  ALIAS___onMouseUp = _._onMouseUp;
  _._onMouseUp = function(event) {
    ALIAS___onMouseUp.call(this, event);
    if (event.button === 2) {
      this._kdMousePressed2 = false;
    }
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    if (this.kdIsPressed2()) {
      return this._kdPressedTime2++;
    }
  };
  //?[NEW]
  return _.kdIsPressed2 = function() {
    return this._kdMousePressed2 === true;
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  // * Методы из RPG Maker MZ которых нет в RPG Maker MV
  if (KDCore.isMZ()) {
    return;
  }
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Scene_Base.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    
    //@[DEFINES]
    _ = Scene_Base.prototype;
    _.calcWindowHeight = function(numLines, selectable) {
      if (selectable === true) {
        return Window_Selectable.prototype.fittingHeight(numLines);
      } else {
        return Window_Base.prototype.fittingHeight(numLines);
      }
    };
  })();
  (function() {    // ■ END Scene_Base.coffee
    //---------------------------------------------------------------------------

    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Window_Selectable.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    
    //@[DEFINES]
    _ = Window_Selectable.prototype;
    _.itemLineRect = function(index) {
      return this.itemRect(index);
    };
  })();
  (function() {    // ■ END Window_Selectable.coffee
    //---------------------------------------------------------------------------

    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Window_Base.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var ALIAS__initialize, ALIAS__processEscapeCharacter, _;
    //@[DEFINES]
    _ = Window_Base.prototype;
    // * Чтоб можно было Rectangle принимать в конструктор
    //@[ALIAS]
    ALIAS__initialize = _.initialize;
    _.initialize = function(x, y, w, h) {
      if (x instanceof PIXI.Rectangle || x instanceof Rectangle) {
        return ALIAS__initialize.call(this, x.x, x.y, x.width, x.height);
      } else {
        return ALIAS__initialize.call(this, ...arguments);
      }
    };
    
    // * В MZ используется FS для изменения размера шрифта в тексте
    //@[ALIAS]
    ALIAS__processEscapeCharacter = _.processEscapeCharacter;
    _.processEscapeCharacter = function(code, textState) {
      if (code === "FS") {
        this.contents.fontSize = this.obtainEscapeParam(textState);
      } else {
        ALIAS__processEscapeCharacter.call(this, code, textState);
      }
    };
  })();
  (function() {    // ■ END Window_Base.coffee
    //---------------------------------------------------------------------------

    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Spriteset_Map.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    
    //@[DEFINES]
    _ = Spriteset_Map.prototype;
    _.findTargetSprite = function(target) {
      return this._characterSprites.find(function(sprite) {
        return sprite.checkCharacter(target);
      });
    };
  })();
  return (function() {    // ■ END Spriteset_Map.coffee
    //---------------------------------------------------------------------------

    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Sprite_Character.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    
    //@[DEFINES]
    _ = Sprite_Character.prototype;
    _.checkCharacter = function(character) {
      return this._character === character;
    };
  })();
});

// ■ END Sprite_Character.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var alias_SM_processMapTouch, alias_TIOMM;
  //?SMouse better alternative
  if (KDCore.isMZ()) {
    return;
  }
  // * Для ButtonM
  //@[ALIAS]
  alias_SM_processMapTouch = Scene_Map.prototype.processMapTouch;
  Scene_Map.prototype.processMapTouch = function() {
    if ($gameTemp.kdButtonUnderMouse != null) {
      if ($gameTemp.kdButtonUnderMouse.parent == null) {
        return $gameTemp.kdButtonUnderMouse = null;
      } else {

      }
    } else {
      return alias_SM_processMapTouch.call(this);
    }
  };
  //@[ALIAS]
  alias_TIOMM = TouchInput._onMouseMove;
  TouchInput._onMouseMove = function(event) {
    var x, y;
    alias_TIOMM.call(this, event);
    x = Graphics.pageToCanvasX(event.pageX);
    y = Graphics.pageToCanvasY(event.pageY);
    if (Graphics.isInsideCanvas(x, y)) {
      return this._onHover(x, y);
    }
  };
  
  //?NEW, from MZ
  return TouchInput._onHover = function(_x, _y) {
    this._x = _x;
    this._y = _y;
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var ALIAS__clear, ALIAS__update, _;
  if (KDCore.isMZ()) {
    return;
  }
  //@[DEFINES]
  _ = Input;
  //@[ALIAS]
  ALIAS__clear = _.clear;
  _.clear = function() {
    ALIAS__clear.call(this);
    return this._virtualButton = null;
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    if (this._virtualButton == null) {
      return;
    }
    this._latestButton = this._virtualButton;
    this._pressedTime = 0;
    return this._virtualButton = null;
  };
  return _.virtualClick = function(buttonName) {
    return this._virtualButton = buttonName;
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var ALIAS___startLoading, _;
  // * В версии RPG Maker MZ 1.5.0 появился баг что картинки не успевают прогрузится
  // * Данный фикс, возвращает старое поведение
  if (!KDCore.isMZ()) {
    return;
  }
  //@[DEFINES]
  _ = Bitmap.prototype;
  //@[ALIAS]
  ALIAS___startLoading = _._startLoading;
  return _._startLoading = function() {
    if (Utils.hasEncryptedImages()) {
      ALIAS___startLoading.call(this, ...arguments);
    } else {
      // * Это из RPG Maker MZ до версии 1.5
      this._image = new Image();
      this._image.onload = this._onLoad.bind(this);
      this._image.onerror = this._onError.bind(this);
      this._destroyCanvas();
      this._loadingState = "loading";
      this._image.src = this._url;
    }
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var alias_WBDTEX_KDCore29122021;
  // * <center>, для RPG Maker MZ и если нету Visu Message Core
  if (KDCore.isMZ()) {
    alias_WBDTEX_KDCore29122021 = Window_Base.prototype.drawTextEx;
    Window_Base.prototype.drawTextEx = function(text, x, y, width) {
      var e, newText;
      try {
        if (Imported.VisuMZ_1_MessageCore !== true) { // * В Visu уже есть <center>
          if (String.any(text) && text.contains("<center>")) {
            if (text[0] === "<" && text[1] === "c") { // * Должен быть в начале строки
              newText = text.replace("<center>", "");
              return this.drawTextExInCenter(newText, x, y, width);
            }
          }
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return alias_WBDTEX_KDCore29122021.call(this, ...arguments);
    };
  }
  //?NEW
  Window_Base.prototype.drawTextExInCenter = function(text, x, y, width, height) {
    var e, newX, newY, textSize;
    try {
      if (KDCore.isMV()) { // * В MV нет поддержки данного метода
        this.drawTextEx(...arguments);
        return;
      }
      textSize = this.textSizeEx(text);
      newX = x + width / 2 - textSize.width / 2;
      if ((height != null) && height > 0) {
        newY = y + height / 2 - textSize.height / 2;
      } else {
        newY = y;
      }
      return this.drawTextEx(text, newX, newY, width);
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return this.drawTextEx(text, x, y, width);
    }
  };
  //?NEW
  Window_Base.prototype.drawTextExWithWordWrap = function(text, x, y, width, maxLines) {
    var maxWidth, wrappedText;
    this.drawTextEx("", 0, 0, 100);
    maxWidth = this.contentsWidth();
    wrappedText = Window_Message.prototype.pWordWrap.call(this, text, width || maxWidth, maxLines);
    return this.drawTextEx(wrappedText, x, y, width);
  };
  //?NEW
  return Window_Message.prototype.pWordWrap = function(text, maxWidth, maxLines) {
    var i, j, k, l, line, lines, newLines, ref, ref1, result, spaceLeft, spaceWidth, wordWidth, wordWidthWithSpace, words;
    lines = text.split('\n');
    maxWidth = maxWidth;
    spaceWidth = this.contents.measureTextWidth(' ');
    result = '';
    newLines = 1;
    for (i = k = 0, ref = lines.length; (0 <= ref ? k < ref : k > ref); i = 0 <= ref ? ++k : --k) {
      spaceLeft = maxWidth;
      line = lines[i];
      words = line.split(' ');
      for (j = l = 0, ref1 = words.length; (0 <= ref1 ? l < ref1 : l > ref1); j = 0 <= ref1 ? ++l : --l) {
        wordWidth = this.contents.measureTextWidth(words[j].replaceAll(/\\C\[\d+\]/g, ""));
        wordWidthWithSpace = wordWidth + spaceWidth;
        if (j === 0 || wordWidthWithSpace > spaceLeft) {
          if (j > 0) {
            if (maxLines === newLines) {
              return result;
            }
            result += '\n';
            newLines++;
          }
          result += words[j];
          spaceLeft = maxWidth - wordWidth;
          if (j === 0 && line.match(/\\n\w*\s*<\s*\\n\[\w*\s*\]\s*>*/gi)) {
            spaceLeft += 200;
          }
        } else {
          spaceLeft -= wordWidthWithSpace;
          result += ' ' + words[j];
        }
      }
      if (i < lines.length - 1) {
        result += '\n';
      }
    }
    return result;
  };
});


// Generated by CoffeeScript 2.6.1
// * Последний файл (после всех классов)
// * Загружает библиотеки
var i, len, lib, ref, text;

if (KDCore._requireLoadLibrary === true) {
  ref = KDCore[KDCore._loader];
  for (i = 0, len = ref.length; i < len; i++) {
    lib = ref[i];
    lib();
  }
  KDCore[KDCore._loader] = [];
  text = "%c  KDCore is loaded " + KDCore.Version;
  console.log(text, 'background: #222; color: #82b2ff');
}

// ==========================================================================
// ==========================================================================

//   END OF PLUGINS CORE LIBRARY
//   (Next code is this plugin code)

// ==========================================================================
// ==========================================================================

//Plugin KDCore builded by PKD PluginBuilder 2.2 - 20.05.2023

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ API: Phone
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = window.PKD_PhoneMenu;
  _.Show = function() {
    if ($gameSystem._pkdPhoneDisabled === true) {
      return;
    }
    return SceneManager.push(PKD_ScenePhone);
  };
  _.Hide = function() {
    var e;
    try {
      if (PKD_PhoneMenu.Utils.isPhoneScene()) {
        return SceneManager._scene.popScene();
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.Disable = function() {
    $gameSystem._pkdPhoneDisabled = true;
    PKD_PhoneMenu.Hide();
  };
  _.Enable = function() {
    return $gameSystem._pkdPhoneDisabled = null;
  };
  _.AddMessage = function(avatar, name, evId, fromMap = false) {
    var e;
    try {
      $gameSystem.pkdAddNewPhoneMessage(avatar, name, evId, fromMap);
      if (KDCore.Utils.isSceneMap()) {
        SceneManager._scene.pkdRefreshPhoneIcon();
      }
      PKD_PhoneMenu.Utils.refreshMessagesAppAlert();
      if (PKD_PhoneMenu.PP.isShowNotifyOnNewMessage()) {
        return PKD_PhoneMenu.Utils.showNewMessageNotify(name);
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.IsHaveNewMessages = function() {
    var e;
    try {
      return $gameSystem.pkdIsHaveAnyUnreadMessage();
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return false;
  };
  _.AddApp = function(name) {
    var apps, e;
    try {
      apps = $gameSystem.pkdGetPhone().apps;
      if (apps.contains(name)) {
        return;
      }
      apps.push(name);
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  _.RemoveApp = function(name) {
    var e;
    try {
      $gameSystem.pkdGetPhone().apps.delete(name);
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  _.ChangePhone = function(imageName) {
    var e;
    try {
      if (!String.any(imageName)) {
        return;
      }
      return $gameSystem.pkdGetPhone().image = imageName;
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.ChangeWallpaper = function(imageName) {
    var e;
    try {
      if (!String.any(imageName)) {
        return;
      }
      return $gameSystem.pkdGetPhone().wallpaper = imageName;
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.ChangeMessageWallpaper = function(imageName) {
    var e;
    try {
      if (!String.any(imageName)) {
        return;
      }
      return $gameSystem.pkdGetPhone().messagesWallpaper = imageName;
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.ChangeGalleryWallpaper = function(imageName) {
    var e;
    try {
      if (!String.any(imageName)) {
        return;
      }
      return $gameSystem.pkdGetPhone().galleryWallpaper = imageName;
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.ShowModalMessage = function(titleText, optionText = "OK") {
    var e;
    try {
      return PKD_PhoneMenu.Utils.RequestModalMenuForData({
        titleText,
        options: [
          {
            title: optionText,
            action: null
          }
        ]
      });
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  // * Example: Phone.ShowModalQuestion("Do you want?", "Yes", 5, "No", "console.log(123)")
  // * Example: Phone.ShowModalQuestion("Load autosave?", "Yes", 0, "No", 0)
  _.ShowModalQuestion = function(titleText, optionAText, optionAScriptOrEv, optionBText, optionBScriptOrEv) {
    var e;
    try {
      return PKD_PhoneMenu.Utils.RequestModalMenuForData({
        titleText,
        options: [
          {
            title: optionAText,
            action: optionAScriptOrEv
          },
          {
            title: optionBText,
            action: optionBScriptOrEv
          }
        ]
      });
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.ShowModalMenu = function(titleText, eventId, fromMap = false) {
    var data, e;
    try {
      data = {
        titleText,
        options: PKD_PhoneMenu.Utils.ConvertEventBodyToModalMenuChoices(eventId, fromMap)
      };
      if (data.options != null) {
        //console.log(data)
        return PKD_PhoneMenu.Utils.RequestModalMenuForData(data); // * Can be NULL
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  //?params: {image: "", text: "", textPos: [0, 0], se: ""}
  _.Notify = function(params) {
    var e;
    try {
      if (params == null) {
        return;
      }
      if (!String.any(params.image)) {
        console.warn("Notify require Image!");
        return;
      }
      if (params.textPos == null) {
        params.textPos = [0, 0];
      }
      if (params.text == null) {
        params.text = "";
      }
      return PKD_PhoneMapNotifyManager.pushToQueue(params);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  //?Inner
  _.StartApp = function(id) {
    var e;
    try {
      if (!PKD_PhoneMenu.Utils.isPhoneScene()) {
        console.warn("Phone Apps can be started only inside Phone Scene!");
      } else {
        return SceneManager._scene.setPhoneAppContext(id);
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  //?Inner
  _.ExecuteSingleCmdInMessage = function(commandList) {
    var e;
    try {
      if (commandList == null) {
        return;
      }
      if (!PKD_PhoneMenu.Utils.isPhoneScene()) {
        return;
      }
      return SceneManager._scene._startInnerCe(commandList);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
})();

(function() {  // ■ END Phone
  //---------------------------------------------------------------------------

  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ API: Phone Map
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  // * Скрипты для иконки телефона на сцене карты
  window.PKD_PhoneMenu.Map = {};
  window.PhoneIcon = window.PKD_PhoneMenu.Map;
  //@[DEFINES]
  _ = window.PKD_PhoneMenu.Map;
  _.Show = function() {
    var e;
    try {
      if (PKD_PhoneMenu.PP.getPhoneSettings().isShowMapIcon !== true) {
        return;
      }
      if ($gameSystem._pkdPhoneIconDisabled === true) {
        return;
      }
      if (!KDCore.Utils.isSceneMap()) {
        return;
      }
      return SceneManager._scene.pkdShowPhoneIcon();
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.Hide = function() {
    var e;
    try {
      if (!KDCore.Utils.isSceneMap()) {
        return;
      }
      return SceneManager._scene.pkdHidePhoneIcon();
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.Disable = function() {
    $gameSystem._pkdPhoneIconDisabled = true;
    PKD_PhoneMenu.Map.Hide();
  };
  _.Enable = function() {
    return $gameSystem._pkdPhoneIconDisabled = null;
  };
})();

// ■ END API: Phone Map
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
(function() {
  var _;
  //@[DEFINES]
  _ = PKD_PhoneMenu.PP;
  
  // * paramName, defaultValue
  _.getLoaderParam = function() {
    var e;
    try {
      if (this._loader == null) {
        PKD_PhoneMenu.LoadPluginSettings();
      }
      return this._loader.getParam(...arguments);
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return null;
  };
  _.getMessagesMapId = function() {
    return this.getLoaderParam("messagesMapId", 0);
  };
  _.getPhoneSettings = function() {
    return this.getLoaderParam("phoneSettings", {
      openPhoneKey: "p",
      screenSize: {
        w: 278,
        h: 434
      },
      screenOffset: {
        x: 16,
        y: 86
      },
      phonePosition: {
        x: "Graphics.width / 2 - 155",
        y: "20"
      },
      appsGrid: {
        x: 3,
        y: 4
      },
      isAnimate: true,
      animationSpeed: 24,
      appBackgroundColor: "#FFF",
      image: "PhoneFace",
      wallpaper: "Wallpaper1",
      isShowMapIcon: true,
      mapIconPosition: {
        x: 4,
        y: 120
      }
    });
  };
  _.isUseAsMainMenu = function() {
    return this.getLoaderParam("isUseAsMainMenu", false);
  };
  _.getNotificationSettings = function() {
    return this.getLoaderParam("notifySettings", {
      position: {
        x: "Graphics.width / 2",
        y: 0
      },
      stayTime: 120,
      appearSpeed: 40,
      disappearSpeed: 55,
      moveOutSpeed: 6,
      initialScale: 0.8,
      finalScale: 1.0,
      isMoveDownWhenMoveOut: false,
      defaultFontSize: 18
    });
  };
  _.isShowNotifyOnNewMessage = function() {
    return this.getLoaderParam("isShowNotifyOnNewMsg", true);
  };
  _.getNewMessageNotifySettings = function() {
    return this.getLoaderParam("newMsgNotifyConfig", {
      image: "Notify_NewMessage",
      text: "New message from \\C[1]$1",
      textPos: {
        x: 30,
        y: 40
      },
      se: "Recovery"
    });
  };
  _.getMessagesStyleSettings = function() {
    return this.getLoaderParam("messagesStyle", {
      playerMessagePosition: 'right',
      playerMessageFontSize: 12,
      playerMessageTextColor: "#00ff00",
      playerBackRectColor: "rgba(0,0,0,0)", //marked
      charMessagePosition: 'left',
      charMessageFontSize: 12,
      charMessageTextColor: "#FFFFFF",
      charBackRectColor: "rgba(0,0,0,0.7)"
    });
  };
  _.getPhoneAppNameTextSettings = function() {
    return $ppJson_AppNameTestSettings;
  };
  _.getPhoneDefaultApps = function() {
    return this.getLoaderParam("phoneDefaultAppsList", "messagesApp, saveApp, loadApp, galleryApp, settingsApp");
  };
  //TODO: Сделать стандартные настройки для системных приложений: messagesApp, galleryApp
  _.getPhoneAppDataById = function(appId) {
    var e, userData;
    try {
      userData = this.getPhoneApps().getById(appId);
      // * Gallery App был добавлен позже и у пользователя может не быть его в параметрах
      if (appId === "galleryApp" && (userData == null)) {
        return {
          id: "galleryApp",
          name: "Gallery",
          icon: "AppIcon_Gallery",
          visibleSwitchId: 0,
          enabledSwitchId: 0,
          commonEventId: "Phone.StartApp('galleryApp')",
          isOuterStart: false,
          alertSwitchId: 0
        };
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return null;
    }
    return userData;
  };
  _.getPhoneApps = function() {
    return this.getLoaderParam("phoneApps", [
      {
        id: "messagesApp",
        name: "Messages",
        icon: "AppIcon_Messages",
        visibleSwitchId: 0,
        enabledSwitchId: 0,
        commonEventId: "Phone.StartApp('messagesApp')",
        isOuterStart: false,
        alertSwitchId: 1
      },
      {
        id: "saveApp",
        name: "Save",
        icon: "AppIcon_SaveGame",
        visibleSwitchId: 0,
        enabledSwitchId: 0,
        commonEventId: "SceneManager.push(Scene_Save)",
        isOuterStart: false,
        alertSwitchId: 2
      },
      {
        id: "loadApp",
        name: "Load",
        icon: "AppIcon_LoadGame",
        visibleSwitchId: 0,
        enabledSwitchId: 0,
        commonEventId: "SceneManager.push(Scene_Load)",
        isOuterStart: false,
        alertSwitchId: 0
      },
      {
        id: "settingsApp",
        name: "Settings",
        icon: "AppIcon_Settings",
        visibleSwitchId: 0,
        enabledSwitchId: 0,
        commonEventId: "SceneManager.push(Scene_Options)",
        isOuterStart: false,
        alertSwitchId: 0
      },
      {
        id: "galleryApp",
        name: "Gallery",
        icon: "AppIcon_Gallery",
        visibleSwitchId: 0,
        enabledSwitchId: 0,
        commonEventId: "Phone.StartApp('galleryApp')",
        isOuterStart: false,
        alertSwitchId: 0
      }
    ]);
  };
  _.getGalleryAppSettings = function() {
    return this.getLoaderParam("galleryAppSettings", {
      previewImageHeight: 144,
      gridCols: 2
    });
  };
  _.isBigModeForGallery = function() {
    return this.getLoaderParam("galleryBigMode", true);
  };
  _.isKeepAspectRatioOnPreview = function() {
    return this.getLoaderParam("galleryKeepAspect", true);
  };
  _.getGalleryAppButtonsSettings = function() {
    return this.getLoaderParam("galleryAppButtonsSettings", {
      backButtonIsVisible: true,
      backButtonPosition: {
        x: 2,
        y: 2
      },
      zoomInButtonIsVisible: true,
      zoomInButtonPosition: {
        x: 228,
        y: 2
      }
    });
  };
  _.getGalleryItems = function() {
    return this.getLoaderParam("galleryItems", []);
  };
  _.getModalMenuSettings = function() {
    return this.getLoaderParam("modalMenuSettings", {
      width: 200,
      optionLineHeight: 40,
      titleHeight: 60,
      padding: 10,
      menuColor: "#FFFFFF"
    });
  };
})();


// Generated by CoffeeScript 2.6.1
var PKD_SpritePhoneAppContext;

PKD_SpritePhoneAppContext = class PKD_SpritePhoneAppContext extends KDCore.Sprite {
  constructor() {
    super();
    this._appData = this._loadAppData();
    this._scaleFactor = 0.3;
    this._isReady = false;
    this._create();
    this._createContent();
    this._animateAppear();
  }

  _loadAppData() {
    return {
      name: "App"
    };
  }

  backHandler(phone) {
    return phone != null ? phone.closeAppContext() : void 0;
  }

  onClosing() {}

  update() {
    super.update();
    if (this._changer != null) {
      this._updateAnimation();
    }
    if (this._isReady === true) {
      return this._updateInteractions();
    }
  }

  _updateAnimation() {
    this._changer.update();
    return this._contextBack.scale.set(this._scaleFactor);
  }

  _updateInteractions() {}

  //TODO:
  getTopHeaderText() {
    return this._appData.name;
  }

  screenSize() {
    var screenSize;
    ({screenSize} = PKD_PhoneMenu.PP.getPhoneSettings());
    return screenSize;
  }

  getAppRect() {
    return PKD_PhoneMenu.Utils.getAppRect();
  }

  _create() {
    var screenSize;
    ({screenSize} = PKD_PhoneMenu.PP.getPhoneSettings());
    this._contextBack = new KDCore.Sprite(this._defaultAppBackgroundBitmap());
    this._contextBack.opacity = 0;
    this._contextBack.anchor.set(0.5);
    this._contextBack.scale.set(0.3);
    this._contextBack.x = screenSize.w / 2;
    this._contextBack.y = screenSize.h / 2;
    return this.addChild(this._contextBack);
  }

  _defaultAppBackgroundBitmap() {
    var appBackgroundColor, b, h, screenSize, w;
    ({screenSize, appBackgroundColor} = PKD_PhoneMenu.PP.getPhoneSettings());
    ({w, h} = screenSize);
    b = new Bitmap(w, h);
    b.fillAll(appBackgroundColor);
    return b;
  }

  _animateAppear() {
    this._contextBack.appear(45);
    this._changer = new KDCore.Changer(this);
    this._changer.change('_scaleFactor').from(0.3).to(1.0).step(0.15).done(() => {
      return this.onAnimatinDone();
    });
    this._changer.start();
  }

  onAnimatinDone() {
    this._isReady = true;
    this._changer = null;
    this._contextBack.opacity = 255;
    this._contextBack.scale.set(1.0);
    return setTimeout((() => {
      var e;
      try {
        return this.showContent();
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }), 100);
  }

  _createContent() {} // * FOR CHILDRENS

  showContent() {} // * FOR CHILDRENS

};


// Generated by CoffeeScript 2.6.1
(function() {
  var _;
  //$[ENCODE]

  //@[DEFINES]
  _ = PKD_PhoneMenu.Utils;
  _.makeNewPhone = function() {
    var apps, e, image, wallpaper;
    ({image, wallpaper} = PKD_PhoneMenu.PP.getPhoneSettings());
    try {
      apps = PKD_PhoneMenu.PP.getPhoneDefaultApps().split(",").map(function(i) {
        return i.trim();
      });
    } catch (error) {
      e = error;
      apps = [];
      KDCore.warning(e);
    }
    return {
      isEnabled: true,
      image,
      wallpaper,
      apps
    };
  };
  _.refreshMessagesAppAlert = function() {
    var app, e;
    try {
      app = PKD_PhoneMenu.PP.getPhoneAppDataById("messagesApp");
      if ((app != null) && app.alertSwitchId > 0) {
        return $gameSwitches.setValue(app.alertSwitchId, PKD_PhoneMenu.IsHaveNewMessages());
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.isPhoneScene = function() {
    return !SceneManager.isSceneChanging() && SceneManager._scene instanceof PKD_ScenePhone;
  };
  _.screenSize = function() {
    return PKD_PhoneMenu.PP.getPhoneSettings().screenSize;
  };
  _.showNewMessageNotify = function(name) {
    var e, image, se, text, textPos;
    try {
      ({image, text, textPos, se} = PKD_PhoneMenu.PP.getNewMessageNotifySettings());
      if (!String.any(name)) {
        name = "";
      }
      textPos = [textPos.x, textPos.y];
      text = text.replace("$1", name);
      return PKD_PhoneMenu.Notify({image, text, textPos, se});
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.isSwitchIsTRUE = function(switchId) {
    var e;
    if (switchId == null) {
      return true;
    }
    if (switchId <= 0) {
      return true;
    }
    try {
      return $gameSwitches.value(switchId) === true;
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return false;
  };
  _.getAllGalleryAlbums = function() {
    var albumName, albums, image, j, len, openedImages;
    openedImages = this.getAllOpenedImagesInGallery();
    albums = [];
    for (j = 0, len = openedImages.length; j < len; j++) {
      image = openedImages[j];
      if (image == null) {
        continue;
      }
      ({albumName} = image);
      if (String.any(albumName) && !albums.contains(albumName)) {
        albums.push(image.albumName);
      }
    }
    return albums;
  };
  _.getAppRect = function() {
    var e, h, screenSize, w;
    try {
      ({screenSize} = PKD_PhoneMenu.PP.getPhoneSettings());
      ({w, h} = screenSize);
      return {
        x: 0,
        y: 0,
        width: w,
        height: h
      };
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return {
        x: 0,
        y: 0,
        width: 200,
        height: 400
      };
    }
  };
  _.getAllOpenedImagesInGallery = function() {
    var allImages, e, imageData, j, len, openedImages;
    try {
      allImages = PKD_PhoneMenu.PP.getGalleryItems();
      openedImages = [];
      for (j = 0, len = allImages.length; j < len; j++) {
        imageData = allImages[j];
        if (this.isSwitchIsTRUE(imageData.enabledSwitchId)) {
          openedImages.push(imageData);
        }
      }
      return openedImages;
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return [];
    }
  };
  _.getOpenedImagesCountPerAlbum = function(albumName) {
    var count, e, image, j, len, openedImages;
    try {
      openedImages = PKD_PhoneMenu.Utils.getAllOpenedImagesInGallery();
      count = 0;
      for (j = 0, len = openedImages.length; j < len; j++) {
        image = openedImages[j];
        if ((image != null) && image.albumName === albumName) {
          count++;
        }
      }
      return count;
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return 0;
    }
  };
  _.isSystemApp = function(appId) {
    return ["modalMenu", "messagesApp", "galleryApp"].contains(appId);
  };
  _.getSystemAppContext = function(appId) {
    switch (appId) {
      case "modalMenu":
        return new PKD_SpritePhoneModalMenuContext();
      case "messagesApp":
        return new PKD_SpritePhoneAppMessagesContext();
      case "galleryApp":
        return new PKD_SpritePhoneAppGalleryContext();
      default:
        return new PKD_SpritePhoneAppContext();
    }
  };
  _.GetAppData = function(appId) {
    return PKD_PhoneMenu.PP.getPhoneAppDataById(appId);
  };
  // * not public
  _.SetPhoneTopText = function(text) {
    var e;
    try {
      if (!PKD_PhoneMenu.Utils.isPhoneScene()) {
        return;
      }
      return SceneManager._scene.drawTopText(text);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  // Support for \V[n] \N[n] \P[n] \G
  _.ConvertEscapeCodes = function(text) {
    var actorName, e, partyMemberName;
    try {
      text = text.replace(/\\/g, "\x1b");
      text = text.replace(/\x1b\x1b/g, "\\");
      // \V[n]
      while (text.match(/\x1bV\[(\d+)\]/gi)) {
        text = text.replace(/\x1bV\[(\d+)\]/gi, function(_, p1) {
          return $gameVariables.value(parseInt(p1));
        });
      }
      actorName = function(n) {
        return Window_Base.prototype.actorName.call(this, n);
      };
      // \N[n]
      text = text.replace(/\x1bN\[(\d+)\]/gi, function(_, p1) {
        return actorName(parseInt(p1));
      });
      partyMemberName = function(n) {
        return Window_Base.prototype.partyMemberName.call(this, n);
      };
      // \P[n]
      text = text.replace(/\x1bP\[(\d+)\]/gi, function(_, p1) {
        return partyMemberName(parseInt(p1));
      });
      // \G
      text = text.replace(/\x1bG/gi, TextManager.currencyUnit);
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return text;
  };
  _.RequestModalMenuForData = function(data) {
    var e;
    try {
      $gameTemp._pkdPhoneModalMenuData = data;
      if (PKD_PhoneMenu.Utils.isPhoneScene()) {
        return Phone.StartApp("modalMenu");
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.ConvertEventBodyToModalMenuChoices = function(evId, fromMap) {
    var action, e, eventBodyList, index, innerCommands, item, j, k, len, len1, options, optionsActions, optionsTitles, startCollectInnerCommands, title;
    try {
      if (evId <= 0) {
        return null;
      }
      eventBodyList = null;
      if (fromMap === true) {
        if (DataManager.pkdIsPhoneMessagesMapIsValid()) {
          if ($dataPKDPMsgMap.events[evId] != null) {
            eventBodyList = $dataPKDPMsgMap.events[evId].pages[0].list;
          }
        }
      } else {
        if (KDCore.Utils.isValidCE(evId)) {
          eventBodyList = $dataCommonEvents[evId].list;
        }
      }
      if (eventBodyList == null) {
        return null;
      }
      optionsTitles = [];
      optionsActions = [];
      startCollectInnerCommands = false;
      innerCommands = [];
      for (j = 0, len = eventBodyList.length; j < len; j++) {
        item = eventBodyList[j];
        if (item == null) {
          continue;
        }
        if (startCollectInnerCommands === true) {
          if (item.code === 0) {
            startCollectInnerCommands = false;
            optionsActions.push(innerCommands);
          } else {
            if (item.indent === 1) {
              innerCommands.push(item);
            }
          }
        } else if (item.code === 402) {
          optionsTitles.push(item.parameters[1]);
          innerCommands = [];
          startCollectInnerCommands = true;
        }
      }
      options = [];
      for (index = k = 0, len1 = optionsTitles.length; k < len1; index = ++k) {
        title = optionsTitles[index];
        action = optionsActions[index];
        if (String.any(title) && (action != null)) {
          options.push({title, action});
        }
      }
      
      // * Max 6
      return options.slice(0, 6);
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return null;
  };
})();


// Generated by CoffeeScript 2.6.1
//TODO: Move to KDCore!
var PKD_ButtonsListChoice;

PKD_ButtonsListChoice = class PKD_ButtonsListChoice {
  constructor() {
    this._buttons = Array.from(arguments);
    this._lastCursorPosXY = null;
    this._selectedIndex = -1;
    return;
  }

  inKeyboardMode() {
    return this._lastCursorPosXY != null;
  }

  addButtons() {
    return this._buttons.push(...arguments);
  }

  currentSelected() {
    if (this._selectedIndex >= 0 && this._selectedIndex < this._buttons.length) {
      return this._buttons[this._selectedIndex];
    } else {
      return null;
    }
  }

  update() {
    if (this.inKeyboardMode()) {
      if (this._isShouldOutFromKeyboardControl()) {
        this._outFromKeyboardControl();
        return;
      }
      this._updateKeyboardControls();
    } else {
      if (this._isShouldInToKeyboardMode()) {
        this._inToKeyboardMode();
      }
    }
  }

  _isShouldOutFromKeyboardControl() {
    return TouchInput.x !== this._lastCursorPosXY.x || TouchInput.y !== this._lastCursorPosXY.y;
  }

  _outFromKeyboardControl() {
    this._lastCursorPosXY = null;
    this._selectedIndex = -1;
    this._disableManualSelectForButtons();
    this._reselectButton();
  }

  _disableManualSelectForButtons() {
    var b, i, len, ref, results;
    ref = this._buttons;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      b = ref[i];
      results.push(b != null ? b.disableManualHover() : void 0);
    }
    return results;
  }

  _enableManualSelectForButtons() {
    var b, i, len, ref, results;
    ref = this._buttons;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      b = ref[i];
      results.push(b != null ? b.setManualHover() : void 0);
    }
    return results;
  }

  _reselectButton() {
    var b, i, len, ref, results;
    ref = this._buttons;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      b = ref[i];
      if (b.isMouseIn()) {
        results.push(b != null ? b._updateHover() : void 0);
      } else {
        results.push(void 0);
      }
    }
    return results;
  }

  _isShouldInToKeyboardMode() {
    return Input.isTriggered('up') || Input.isTriggered('down');
  }

  _inToKeyboardMode() {
    var ref, x, y;
    ({x, y} = TouchInput);
    this._lastCursorPosXY = {x, y};
    this._selectedIndex = this._getCurrentSelectedIndex();
    this._enableManualSelectForButtons();
    if ((ref = this.currentSelected()) != null) {
      ref.setManualSelected(true);
    }
  }

  _getCurrentSelectedIndex() {
    var b, i, index, len, ref;
    ref = this._buttons;
    for (index = i = 0, len = ref.length; i < len; index = ++i) {
      b = ref[index];
      if (b.isMouseIn()) {
        return index;
      }
    }
    return 0;
  }

  _updateKeyboardControls() {
    if (Input.isTriggered('up')) {
      this._moveUp();
    } else if (Input.isTriggered('down')) {
      this._moveDown();
    } else if (Input.isTriggered('ok')) {
      this._pressOnButton();
    }
  }

  _moveUp() {
    var ref;
    this._resetManualSelection();
    if (this._selectedIndex < 0) {
      this._selectedIndex = 0;
    } else {
      this._selectedIndex--;
    }
    if (this.currentSelected() == null) {
      this._selectedIndex = this._buttons.length - 1;
    }
    if ((ref = this.currentSelected()) != null) {
      ref.setManualSelected(true);
    }
  }

  _resetManualSelection() {
    var b, i, len, ref, results;
    ref = this._buttons;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      b = ref[i];
      results.push(b != null ? b.setManualSelected(false) : void 0);
    }
    return results;
  }

  _moveDown() {
    var ref;
    this._resetManualSelection();
    this._selectedIndex++;
    if (this.currentSelected() == null) {
      this._selectedIndex = 0;
    }
    if ((ref = this.currentSelected()) != null) {
      ref.setManualSelected(true);
    }
  }

  _pressOnButton() {
    var ref;
    return (ref = this.currentSelected()) != null ? ref.click() : void 0;
  }

};


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ DataManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__loadDataFile, ALIAS__loadDatabase, _;
  //@[DEFINES]
  _ = DataManager;
  DataManager._databaseFiles.push({
    name: "$ppJson_AppNameTestSettings",
    src: "PKD_PhoneMenu/PhoneAppNameTextSettings.json"
  }, {
    name: "$ppJson_ModalMenuOptionSettings",
    src: "PKD_PhoneMenu/PhoneModalMenuOptionTextSettings.json"
  }, {
    name: "$ppJson_ModalMenuTitleTextSettings",
    src: "PKD_PhoneMenu/PhoneModalMenuTitleTextSettings.json"
  });
  //@[ALIAS]
  ALIAS__loadDataFile = _.loadDataFile;
  _.loadDataFile = function(name, src) {
    if (src.contains("Phone")) {
      src = src.replace("Test_", "");
    }
    return ALIAS__loadDataFile.call(this, name, src);
  };
  
  //@[ALIAS]
  ALIAS__loadDatabase = _.loadDatabase;
  _.loadDatabase = function() {
    var e;
    ALIAS__loadDatabase.call(this);
    try {
      return this.pkdLoadPhoneMessagesMap();
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
})();

// ■ END DataManager.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ DataManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = DataManager;
  _.pkdIsPhoneMessagesMapIsValid = function() {
    return typeof $dataPKDPMsgMap !== "undefined" && $dataPKDPMsgMap !== null;
  };
  _.pkdLoadPhoneMessagesMap = function() {
    var filename, mapId;
    window.$dataPKDPMsgMap = null;
    mapId = PKD_PhoneMenu.PP.getMessagesMapId();
    if (!(mapId > 0)) {
      return;
    }
    filename = 'Map%1.json'.format(mapId.padZero(3));
    this.loadDataFile('$dataPKDPMsgMap', filename);
  };
})();

// ■ END DataManager.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Player.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__update, _;
  //@[DEFINES]
  _ = Game_Player.prototype;
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this, ...arguments);
    if (this.pIsCanOpenPhoneNow()) {
      PKD_PhoneMenu.Show();
    }
  };
})();

// ■ END Game_Player.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Player.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Player.prototype;
  _.pIsCanOpenPhoneNow = function() {
    if ($gameMap.isEventRunning() || $gameMessage.isBusy()) {
      return false;
    }
    if (Input.isTriggered(PKD_PhoneMenu.PP.getPhoneSettings().openPhoneKey)) {
      return true;
    }
  };
})();

// ■ END Game_Player.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_System.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //$[ENCODE]

  //@[DEFINES]
  _ = Game_System.prototype;
  _.pkdGetPhone = function() {
    if (this._pkdPhone == null) {
      this._pkdPhone = PKD_PhoneMenu.Utils.makeNewPhone();
    }
    return this._pkdPhone;
  };
  _.pkdIsHaveAnyUnreadMessage = function() {
    var e, i, item, len, msgs;
    try {
      msgs = this.pkdGetPhoneMessagesList();
      for (i = 0, len = msgs.length; i < len; i++) {
        item = msgs[i];
        if (this.pkdIsNewMessageFrom(item.name)) {
          return true;
        }
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return false;
  };
  _.pkdGetPhoneMessagesList = function() {
    if (this._pkdPhoneMessages == null) {
      this._pkdPhoneMessages = [];
    }
    return this._pkdPhoneMessages;
  };
  _.pkdAddNewPhoneMessage = function(avatar, name, evId, fromMap) {
    var e, item, msgs;
    try {
      msgs = this.pkdGetPhoneMessagesList();
      // * Тут нельзя использовать pkdIsNewMessageFrom
      // * т.к. игрок может добавить новое сообщение в момент текущего,
      // * а pkdIsNewMessageFrom проверяет прочитано ли, а может быть
      // * ещё не прочитано
      item = msgs.getByField('name', name);
      if (fromMap === true) {
        evId = "fromMap_" + evId;
      }
      if (item == null) {
        return msgs.push({
          avatar,
          name,
          evId: [evId]
        });
      } else {
        if (item != null) {
          if (!item.evId.contains(evId)) {
            return item.evId.push(evId); // * Add new message
          }
        }
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.pkdGetOldMessagesList = function() {
    if (this._pkdPhoneOldMessages == null) {
      this._pkdPhoneOldMessages = [];
    }
    return this._pkdPhoneOldMessages;
  };
  _.pkdIsNewMessageFrom = function(name) {
    var e, item, lastEvId, list;
    try {
      list = this.pkdGetPhoneMessagesList();
      item = list.getByField('name', name);
      if (item == null) {
        return true;
      }
      lastEvId = item.evId.last();
      return !this.pkdGetOldMessagesList().contains(lastEvId);
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return true;
    }
  };
  _.pkdGetMessagesHistory = function() {
    if (this._pkdPhoneMessagesHistory == null) {
      this._pkdPhoneMessagesHistory = {};
    }
    return this._pkdPhoneMessagesHistory;
  };
  _.pkdPreparePhoneImages = function() {
    var p;
    p = this.pkdGetPhone();
    ImageManager.loadPictureForPhone(p.image);
    ImageManager.loadPictureForPhone(p.wallpaper);
  };
})();

// ■ END Game_System.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ ImageManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = ImageManager;
  _.loadPictureForPhone = function(filename) {
    return this.loadBitmap('img/pPhoneMenu/', filename);
  };
})();

// ■ END ImageManager.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
window.PKD_PhoneMapNotifyManager = function() {};

(function() {
  var _;
  //@[DEFINES]
  _ = window.PKD_PhoneMapNotifyManager;
  _.init = function() {
    if (this.actualNotify() != null) {
      this.destroyActualNotify();
    }
    this.notifyQueque = [];
  };
  _.scene = function() {
    return SceneManager._scene;
  };
  _.isCanShowNotifyNow = function() {
    return KDCore.Utils.isMapScene() || PKD_PhoneMenu.Utils.isPhoneScene();
  };
  //%[MAIN]
  _.pushToQueue = function(item) {
    this.notifyQueque.push(item);
    return this.refresh();
  };
  _.showNewNotify = function() {
    var e, item;
    if (!this.isCanShowNotifyNow()) {
      this.wait();
      return;
    }
    if (this.actualNotify() != null) {
      this.destroyActualNotify();
    }
    if (!this.isHaveAnyNotifyToShow()) {
      return;
    }
    try {
      if (this.isCanShowNotifyNow()) {
        item = this.notifyQueque.shift();
        if (item != null) {
          this.actualNotifySprite = this.scene().pkdShowPhoneNotify(item);
        }
      }
      // * If we have more than one to show, start timer to repeat refresh
      this.wait();
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  _.isHaveAnyNotifyToShow = function() {
    var ref;
    return ((ref = this.notifyQueque) != null ? ref.length : void 0) > 0;
  };
  _.refresh = function() {
    var actualNotify, e;
    try {
      actualNotify = this.actualNotify();
      if ((actualNotify != null) && actualNotify.isAlive()) {
        if (actualNotify.parent === null) {
          this.destroyActualNotify();
        }
        this.wait();
        return;
      } else {
        if (this.isHaveAnyNotifyToShow()) {
          this.showNewNotify();
        } else {
          this.clearSounds();
        }
      }
      return;
    } catch (error) {
      e = error;
      KDCore.warning(e);
      this.wait();
    }
  };
  _.wait = function() {
    if (this.isHaveAnyNotifyToShow()) {
      return setTimeout((function() {
        return PKD_PhoneMapNotifyManager.refresh();
      }), 1600);
    } else {
      return this.clearSounds();
    }
  };
  _.clearSounds = function() {
    if ((typeof $gameTemp !== "undefined" && $gameTemp !== null) && ($gameTemp._pkdLastPhoneNotifySoundPlayed != null)) {
      $gameTemp._pkdLastPhoneNotifySoundPlayed = null;
    }
  };
  _.actualNotify = function() {
    return this.actualNotifySprite;
  };
  _.destroyActualNotify = function() {
    var e, ref;
    try {
      if ((ref = this.actualNotify()) != null) {
        ref.destroyNotify();
      }
      return this.actualNotifySprite = null;
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
})();


// Generated by CoffeeScript 2.6.1
var PKD_ScenePhone;

PKD_ScenePhone = class PKD_ScenePhone extends Scene_MenuBase {
  constructor() {
    super();
    this._preload();
  }

  _preload() {
    ImageManager.loadPictureForPhone('MessageIcon');
    ImageManager.loadPictureForPhone('MessageIconNew');
    ImageManager.loadPictureForPhone('btnChoice_00');
    ImageManager.loadPictureForPhone('btnDone_00');
    PKD_PhoneMenu.Utils.refreshMessagesAppAlert();
  }

  settings() {
    return PKD_PhoneMenu.PP.getPhoneSettings();
  }

  storedConfig() {
    return $gameSystem.pkdGetPhone();
  }

  closePhoneForAppExecution() {
    return this.popScene();
  }

  refresh() {
    var app, e, i, len, ref;
    try {
      ref = this._appItems;
      for (i = 0, len = ref.length; i < len; i++) {
        app = ref[i];
        app.refresh();
      }
      this.refreshWallpapers();
      return this.refreshPhoneFace();
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  create() {
    super.create();
    this._prepareValues();
    this._createPhone();
    this._createScreen();
    this._createApps(); // Apps
    this.refresh();
    this._phoneContainer.y += this._phoneFace.bitmap.height / 2;
  }

  start() {
    super.start();
    this._startInterpreter(); //Intr
    if (this.settings().isAnimate === true) {
      this._showPhoneAnimated();
    } else {
      this._onAnimationDone();
    }
  }

  update() {
    var ref;
    super.update();
    this._updateInterpreter(); //Intr
    this._updateBackAndClose();
    this._updateKeyboardNavigation(); //Keyb
    if ((ref = this._animationChanger) != null) {
      ref.update();
    }
  }

  _prepareValues() {
    var e, x, y;
    this._kIndex = [0, 0];
    try {
      ({x, y} = this.settings().phonePosition);
      this.phoneX = eval(x);
      this.phoneY = eval(y);
    } catch (error) {
      e = error;
      KDCore.warning(e);
      this.phoneX = 0;
      this.phoneY = 0;
    }
  }

  _createPhone() {
    this._phoneContainer = new KDCore.Sprite();
    this._wallpaper = new KDCore.Sprite();
    this._phoneContent = new Sprite();
    //@_phoneTopStatus =
    //    new KDCore.Sprite(ImageManager.loadPictureForPhone("PhoneFace_TopStatusBar"))
    this._phoneFace = new KDCore.Sprite();
    this._phoneContainer.addChild(this._wallpaper);
    //@_phoneContainer.addChild @_phoneTopStatus
    this._phoneContainer.addChild(this._phoneContent);
    this._phoneContainer.addChild(this._phoneFace);
    this.addChild(this._phoneContainer);
    this._setPhoneFinalPlace();
  }

  _setPhoneFinalPlace() {
    this._phoneContainer.move(this.phoneX, this.phoneY);
  }

  _createScreen() {
    var e, h, w, x, y;
    ({w, h} = this.settings().screenSize);
    this._phoneScreen = new KDCore.Sprite(new Bitmap(w, h));
    try {
      //@_phoneScreen.fillAll()
      //@_phoneScreen.opacity = 100
      ({x, y} = this.settings().screenOffset);
      this._phoneScreen.move(eval(x), eval(y));
    } catch (error) {
      e = error;
      KDCore.warning(e);
      this._phoneScreen.move(0, 0);
    }
    this._phoneContent.addChild(this._phoneScreen);
  }

  _showPhoneAnimated() {
    var e, endY, speed, startY;
    try {
      this._phoneContainer.appear(25, 0);
      this._animationChanger = new KDCore.Changer(this._phoneContainer);
      startY = this.phoneY + this._phoneFace.bitmap.height / 2;
      endY = this.phoneY;
      speed = this.settings().animationSpeed;
      this._animationChanger.change('y').from(startY).to(endY).step(speed).done(this._onAnimationDone.bind(this));
      this._animationChanger.start();
    } catch (error) {
      e = error;
      KDCore.warning(e);
      this._onAnimationDone();
    }
  }

  _onAnimationDone() {
    this._setPhoneFinalPlace();
    this._showApps(); // Apps
    this.refresh();
    this.checkForModal();
  }

  checkForModal() {
    var e;
    try {
      if ($gameTemp._pkdPhoneModalMenuData == null) {
        return;
      }
      return setTimeout((function() {
        return Phone.StartApp("modalMenu");
      }), 200);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  drawTopText(text) {
    var ref;
    return (ref = this.appTextItem) != null ? ref.draw(text) : void 0;
  }

  refreshWallpapers() {
    var e;
    try {
      return this._wallpaper.bitmap = ImageManager.loadPictureForPhone(this.storedConfig().wallpaper);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  refreshPhoneFace() {
    var e;
    try {
      return this._phoneFace.bitmap = ImageManager.loadPictureForPhone(this.storedConfig().image);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  isCancelInput() {
    return Input.isTriggered(PKD_PhoneMenu.PP.getPhoneSettings().openPhoneKey);
  }

  _updateBackAndClose() {
    // * Close Phone again by "Open Phone" key
    if (this.isCancelInput() && !this.isInAppContext()) {
      this.popScene();
      return;
    }
    if (Input.isCancel()) {
      if (!this.isInAppContext()) {
        this.popScene();
      } else {
        this.appContextBackHandlerCall();
        this.refresh();
      }
    }
  }

};


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ PKD_ScenePhone_Ctx.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = PKD_ScenePhone.prototype;
  _.isInAppContext = function() {
    return this._currentContext != null;
  };
  _.setPhoneAppContext = function(appCtxId) {
    var context, e;
    try {
      if (PKD_PhoneMenu.Utils.isSystemApp(appCtxId)) {
        context = PKD_PhoneMenu.Utils.getSystemAppContext(appCtxId);
      } else {
        context = this.getUserAppContext();
      }
      if (context == null) {
        return;
      }
      return this._startAppContext(context);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.closeAppContext = function() {
    return this._startAppContext(null);
  };
  _.appContextBackHandlerCall = function() {
    var e, ref;
    try {
      return (ref = this._currentContext) != null ? ref.backHandler(this) : void 0;
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  //TODO: from JSON
  _.getUserAppContext = function() {
    return null;
  };
  _._startAppContext = function(context) {
    this._clearContext();
    this._currentContext = context;
    if (context == null) {
      return;
    }
    this._phoneScreen.addChild(this._currentContext);
    this._disableAppContainer();
    setTimeout((() => {
      return this.drawTopText(context.getTopHeaderText());
    }), 150);
  };
  _._clearContext = function() {
    var app, i, len, ref;
    if (this._currentContext == null) {
      return;
    }
    this._currentContext.onClosing();
    this._phoneScreen.removeChild(this._currentContext);
    this._enableAppContainer();
    ref = this._appItems;
    for (i = 0, len = ref.length; i < len; i++) {
      app = ref[i];
      app.resetAllAnimations();
    }
    this.drawTopText("");
  };
  _._disableAppContainer = function() {
    this._appsContainer.visible = false;
    this._appsContainer.move(Graphics.width + 1000, Graphics.height + 1000);
    return this._appsContainer.opacity = 0;
  };
  _._enableAppContainer = function() {
    this._appsContainer.visible = true;
    this._appsContainer.move(0, 0);
    return this._showApps();
  };
})();

// ■ END PKD_ScenePhone_Ctx.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ PKD_ScenePhone.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = PKD_ScenePhone.prototype;
  _._createApps = function() {
    this._appSlots = [];
    this._appItems = [];
    this._appsContainer = new KDCore.Sprite();
    this._appsContainer.opacity = 0;
    this._phoneScreen.addChild(this._appsContainer);
    this._createGrid();
    this._createAppNameText();
    this._createAppsItems();
  };
  _._createGrid = function() {
    var h, i, j, k, l, ref, ref1, w, x, y;
    ({x, y} = this.settings().appsGrid);
    ({w, h} = this.settings().screenSize);
    this.appItemW = Math.floor(w / x);
    this.appItemH = Math.floor(h / y);
    for (i = k = 0, ref = y; (0 <= ref ? k < ref : k > ref); i = 0 <= ref ? ++k : --k) {
      for (j = l = 0, ref1 = x; (0 <= ref1 ? l < ref1 : l > ref1); j = 0 <= ref1 ? ++l : --l) {
        this._createAppSlot(j * this.appItemW, i * this.appItemH);
      }
    }
  };
  _._createAppSlot = function(x, y) {
    var app;
    app = new KDCore.Sprite(new Bitmap(this.appItemW, this.appItemH));
    //app.fillAll()
    app.move(x, y);
    this._appSlots.push(app);
    return this._appsContainer.addChild(app);
  };
  _._createAppNameText = function() {
    var p;
    p = PKD_PhoneMenu.PP.getPhoneAppNameTextSettings();
    this.appTextItem = new KDCore.UI.Sprite_UITextWithBack(p);
    this.appTextItem.move(p.position);
    this._phoneContainer.addChild(this.appTextItem);
  };
  _._createAppsItems = function() {
    var app, apps, index, item, k, len, ref;
    apps = this._getAllVisibleApps();
    for (index = k = 0, len = apps.length; k < len; index = ++k) {
      app = apps[index];
      item = this._createAppItem(app);
      if (item == null) {
        continue;
      }
      this._appItems.push(item);
      if ((ref = this._appSlots[index]) != null) {
        ref.addChild(item);
      }
      item.alignWithSlot();
    }
  };
  _._createAppItem = function(appSettings) {
    var appItem;
    appItem = new PKD_SpritePhoneAppItem(appSettings);
    appItem.setTextField(this.appTextItem);
    if (!PKD_PhoneMenu.Utils.isSwitchIsTRUE(appSettings.enabledSwitchId)) {
      appItem.disableApp();
    }
    return appItem;
  };
  _._getAllVisibleApps = function() {
    var addedApps, apps, e;
    try {
      addedApps = this.storedConfig().apps;
      apps = addedApps.map(function(id) {
        return PKD_PhoneMenu.PP.getPhoneAppDataById(id);
      });
      apps = apps.filter(function(app) {
        return app != null;
      });
    } catch (error) {
      e = error;
      KDCore.warning(e);
      apps = [];
    }
    return apps.filter(function(app) {
      return (app != null) && PKD_PhoneMenu.Utils.isSwitchIsTRUE(app.visibleSwitchId);
    });
  };
  _._showApps = function() {
    return this._appsContainer.appear(55);
  };
})();

// ■ END PKD_ScenePhone.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ PKD_Scene_Phone .coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = PKD_ScenePhone.prototype;
  _.isInterpreterIsRunning = function() {
    return this._interpreter.isRunning();
  };
  _._startInterpreter = function() {
    this._interpreter = new Game_Interpreter();
  };
  _._updateInterpreter = function() {
    var e;
    this._interpreter.update();
    if (!this.isInterpreterIsRunning()) {
      try {
        this._checkStartedApp();
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
    }
  };
  _._checkStartedApp = function() {
    var app, i, len, ref;
    ref = this._appItems;
    for (i = 0, len = ref.length; i < len; i++) {
      app = ref[i];
      if (app == null) {
        continue;
      }
      if (app.isCanExecuteAction()) {
        this._startApp(app);
        return;
      }
    }
  };
  _._startApp = function(app) {
    var e, ev, eventData, isOuter;
    try {
      if (app == null) {
        return;
      }
      app.onActionExecuted();
      ({ev, isOuter} = app.getActionForExecution());
      if (isFinite(ev)) {
        if (!KDCore.Utils.isValidCE(ev)) {
          return;
        }
        if (isOuter === true) {
          KDCore.Utils.startCE(ev);
          return this.closePhoneForAppExecution();
        } else {
          eventData = $dataCommonEvents[ev];
          return this._startInnerCe(eventData.list);
        }
      } else {
        return eval(ev);
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _._startInnerCe = function(list) {
    var e;
    try {
      this._interpreter.setup(list);
      return this._interpreter.update();
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
})();

// ■ END PKD_Scene_Phone .coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ PKD_ScenePhone.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = PKD_ScenePhone.prototype;
  _._updateKeyboardNavigation = function() {
    if (this.isInAppContext()) {
      return;
    }
    if (Input.isTriggered('ok')) {
      this._activateAppByKeyb();
      return;
    }
    if ((this._lastMousePos != null) && (this._lastMousePos.x !== TouchInput.x || this._lastMousePos.y !== TouchInput.y)) {
      this._setMouseControl();
    }
    if (Input.isTriggered('left')) {
      this._kIndex[0] -= 1;
      this._setKeyboardControl();
    } else if (Input.isTriggered('right')) {
      this._kIndex[0] += 1;
      this._setKeyboardControl();
    }
    //TODO: Добавить движение по вертикали!
    /*else if Input.isTriggered('up')
        @_kIndex[1] -= 1
        @_setKeyboardControl()
    else if Input.isTriggered('down')
        @_kIndex[1] += 1
        @_setKeyboardControl()*/
    this._refreshKIndex();
  };
  _._setMouseControl = function() {
    var i, j, len, ref;
    this._lastMousePos = null;
    ref = this._appItems;
    for (j = 0, len = ref.length; j < len; j++) {
      i = ref[j];
      i.resetManualHoveredState();
    }
  };
  _._setKeyboardControl = function() {
    var i, index, j, len, ref;
    this._lastMousePos = {};
    this._lastMousePos.x = TouchInput.x;
    this._lastMousePos.y = TouchInput.y;
    ref = this._appItems;
    for (j = 0, len = ref.length; j < len; j++) {
      i = ref[j];
      i.setManualHoveredState();
    }
    index = this._kIndex[0];
    //console.log index
    if (index >= this._appItems.length) {
      index = 0;
    }
    if (index < 0) {
      index = this._appItems.length - 1;
    }
    this._appItems[index].manualSelect();
    this._refreshKIndex();
  };
  _._refreshKIndex = function() {
    var hoveredItem, index;
    hoveredItem = this._appItems.find(function(i) {
      return i.isSelected();
    });
    if (hoveredItem == null) {
      this._kIndex = [0, 0];
    } else {
      index = this._appItems.indexOf(hoveredItem);
      this._kIndex[0] = index;
    }
  };
  //console.log @_kIndex[0]
  _._activateAppByKeyb = function() {
    var e;
    this._refreshKIndex();
    try {
      return this._appItems[this._kIndex[0]].requestActionExecution();
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
})();

// ■ END PKD_ScenePhone.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
var PKD_SpriteGalleryGridScreen;

PKD_SpriteGalleryGridScreen = class PKD_SpriteGalleryGridScreen extends KDCore.Sprite {
  constructor(albumName) {
    super();
    this.albumName = albumName;
    this._prepare();
    this._create();
  }

  _prepare() {
    PKD_PhoneMenu.Utils.SetPhoneTopText(this.albumName);
    this._isBigMode = false;
  }

  isShowPictureMode() {
    return this._zoomed != null;
  }

  isBigModeEnabled() {
    return PKD_PhoneMenu.PP.isBigModeForGallery();
  }

  isInBigMode() {
    return this._isBigMode === true;
  }

  endShowPicture() {
    PKD_PhoneMenu.Utils.SetPhoneTopText(this.albumName);
    SoundManager.playCancel();
    this._removeZoomPicture();
    this._gridWindow.activate();
    this._isBigMode = false;
  }

  _removeZoomPicture() {
    this._zoomed.removeFromParent();
    return this._zoomed = null;
  }

  _createZoomPicture(imageName) {
    var b, e, picSizeX, picSizeY, picX, picY, rect;
    try {
      b = ImageManager.loadPictureForPhone(imageName);
      rect = PKD_PhoneMenu.Utils.getAppRect();
      picX = rect.x;
      picY = rect.y;
      picSizeX = rect.width;
      picSizeY = rect.height;
      this._zoomed = new Sprite(new Bitmap(picSizeX, picSizeY));
      if (b.isReady()) {
        this._placeZoomPictureProperly(b, picX, picY, picSizeX, picSizeY);
      } else {
        b.addLoadListener(() => {
          return this._placeZoomPictureProperly(b, picX, picY, picSizeX, picSizeY);
        });
      }
      return this.addChild(this._zoomed);
    } catch (error) {
      e = error;
      KDCore.warning(e);
      this.endShowPicture();
      return SoundManager.playBuzzer();
    }
  }

  _placeZoomPictureProperly(b, picX, picY, picSizeX, picSizeY) {
    var height, width;
    if (PKD_PhoneMenu.PP.isKeepAspectRatioOnPreview()) {
      ({width, height} = this._getWHKeepInAspect(picSizeX, picSizeY, b.width, b.height));
    } else {
      width = picSizeX;
      height = picSizeY;
    }
    this._zoomed.bitmap.blt(b, 0, 0, b.width, b.height, picX, picY, width, height);
  }

  _getWHKeepInAspect(containerWidth, containerHeight, width, height) {
    var aspectRatio, containerAspectRatio;
    aspectRatio = width / height;
    containerAspectRatio = containerWidth / containerHeight;
    if (aspectRatio > containerAspectRatio) {
      width = containerWidth;
      height = width / aspectRatio;
    } else {
      height = containerHeight;
      width = height * aspectRatio;
    }
    return {width, height};
  }

  _createBigPicture(imageName) {
    var b, e;
    try {
      if (this._zoomed == null) {
        return;
      }
      b = ImageManager.loadPictureForPhone(imageName);
      this._zoomed.bitmap = b;
      this._zoomed.x = Graphics.width / 2 - b.width / 2;
      this._zoomed.y = Graphics.height / 2 - b.height / 2;
      // * Прячем кнопки
      this._zoomed._controls.visible = false;
      this._isBigMode = true;
      return SceneManager._scene.addChild(this._zoomed);
    } catch (error) {
      e = error;
      KDCore.warning(e);
      this.endShowPicture();
      return SoundManager.playBuzzer();
    }
  }

  _createZoomTitle(titleText) {
    var e;
    try {
      return PKD_PhoneMenu.Utils.SetPhoneTopText(titleText);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  _createControlButtons() {
    var controls, e, params;
    try {
      controls = new Sprite();
      this._zoomed._controls = controls;
      this._zoomed.addChild(controls);
      params = PKD_PhoneMenu.PP.getGalleryAppButtonsSettings();
      if (params == null) {
        return;
      }
      if (params.backButtonIsVisible === true) {
        this._backButton = new KDCore.ButtonM("btnBack", false, "pPhoneMenu");
        this._backButton.addClickHandler(() => {
          return this.endShowPicture();
        });
        if ((params.backButtonPosition != null) && (params.backButtonPosition.x != null)) {
          this._backButton.move(params.backButtonPosition);
        }
        controls.addChild(this._backButton);
      }
      if (params.zoomInButtonIsVisible === true && this.isBigModeEnabled()) {
        this._zoomToBigButton = new KDCore.ButtonM("btnZoom", false, "pPhoneMenu");
        this._zoomToBigButton.addClickHandler(() => {
          return this._requestBigImage();
        });
        if ((params.zoomInButtonPosition != null) && (params.zoomInButtonPosition.x != null)) {
          this._zoomToBigButton.move(params.zoomInButtonPosition);
        }
        return controls.addChild(this._zoomToBigButton);
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  _create() {
    return this._createGalleryGridWindow();
  }

  _createGalleryGridWindow() {
    var r;
    r = PKD_PhoneMenu.Utils.getAppRect();
    if (KDCore.isMZ()) {
      this._gridWindow = new PKD_Window_PhoneGalleryGrid(r);
    } else {
      this._gridWindow = new PKD_Window_PhoneGalleryGrid(r.x, r.y, r.width, r.height);
    }
    this._gridWindow.setHandler('ok', this._requireZoom.bind(this));
    this._gridWindow.setAlbumName(this.albumName);
    this._gridWindow.activate();
    this._gridWindow.safeSelect();
    this.addChild(this._gridWindow);
  }

  _requireZoom() {
    var e, imageData;
    try {
      this._gridWindow.deactivate();
      imageData = this._gridWindow.selectedImage();
      if (imageData != null) {
        SoundManager.playCursor();
        this._createZoomPicture(imageData.picName);
        if (String.any(imageData.title)) {
          this._createZoomTitle(imageData.title);
        }
        return this._createControlButtons();
      } else {
        this.endShowPicture();
        return SoundManager.playBuzzer();
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  update() {
    super.update();
    if (this.isShowPictureMode()) {
      return this._checkRequestBigImage();
    }
  }

  _checkRequestBigImage() {
    if (!this.isBigModeEnabled()) {
      return;
    }
    if (this.isInBigMode()) {
      return;
    }
    if (Input.isTriggered('ok')) {
      this._requestBigImage();
      Input.clear();
    }
  }

  _requestBigImage() {
    var e, imageData;
    try {
      imageData = this._gridWindow.selectedImage();
      if (imageData == null) {
        return;
      }
      if (String.any(imageData.picName)) {
        return this._createBigPicture(imageData.picName);
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

};


// Generated by CoffeeScript 2.6.1
var PKD_SpriteMessageScreen;

PKD_SpriteMessageScreen = class PKD_SpriteMessageScreen extends KDCore.Sprite {
  constructor(messageData) {
    super();
    this.messageData = messageData;
    this._prepare();
    this._create();
  }

  isEnded() {
    return this._isEnded === true;
  }

  _prepare() {
    var doneButtonH;
    PKD_PhoneMenu.Utils.SetPhoneTopText(this.messageData.name);
    this._needDrawNextMessage = false;
    this._realMessagesHeight = 0; // * полный размер спрайта (динамически считается)
    this._hSingleMsg = 30;
    this._showMsgTimer = -1; // * Пауза м\у сообщениями
    this._isEnded = false;
    this._canSlideMessage = false; // * Можно прокручивать вниз? (только если есть сообщения)
    this._isInteractiveHistoryMode = false; // * Мы продолжаем читать, т.е. есть старые + новое
    this._isHistoryMode = false; // * Нет новых, просто старые
    // * Отнимаем немного (под размер кнопок)
    doneButtonH = ImageManager.loadPictureForPhone('btnDone_00').height || 30;
    doneButtonH += this._hSingleMsg * 2;
    // this._visibleMessagesHeight = (PKD_PhoneMenu.Utils.screenSize().h - doneButtonH) - 65; //original
    this._visibleMessagesHeight = (PKD_PhoneMenu.Utils.screenSize().h - doneButtonH) - 90; //edit
    this._msgEvId = this.messageData.evId.last();
    this._prepareMode();
  }

  _prepareMode() {
    var dataBefore;
    this._historyData = [];
    this._historyDataBefore = []; // * Эти сообещния не будут повторно сохраняться в историю при показе
    if (!$gameSystem.pkdIsNewMessageFrom(this.messageData.name)) {
      this._isInteractiveHistoryMode = false;
      this._historyDataBefore = [];
      this._isHistoryMode = true;
      this._historyData = $gameSystem.pkdGetMessagesHistory()[this.messageData.name];
    } else {
      // * Есть новое сообщение и до этого были сообщения
      if (this.messageData.evId.length > 1) {
        dataBefore = $gameSystem.pkdGetMessagesHistory()[this.messageData.name];
        this._historyDataBefore = JsonEx.parse(JsonEx.stringify(dataBefore));
        this._isInteractiveHistoryMode = true;
        this._isHistoryMode = false;
      } else {
        // * Новое (единственное) сообщение
        this._isInteractiveHistoryMode = false;
        this._isHistoryMode = false;
      }
      this._prepareMessages(); //1
    }
  }

  _create() {
    var h, mask, w;
    this.contents = new Sprite();
    this.msgContents = new Sprite();
    ({w, h} = PKD_PhoneMenu.Utils.screenSize());
    mask = new Sprite(new Bitmap(w, h));
    mask.bitmap.fillAll("#FFFFFF");
    this.contents.addChild(mask);
    this.msgContents.mask = mask;
    this.addChild(this.contents);
    this.contents.addChild(this.msgContents);
    this._createDoneButton(); //2
    this._needDrawNextMessage = !this._isHistoryMode;
    if (this._isHistoryMode === true || this._isInteractiveHistoryMode === true) { //3
      this._drawHistoryMessages();
    }
  }

  finish() {
    var e;
    this._isEnded = true;
    this._hidePlayerChoices(); //2
    try {
      this._doneButton.visible = true;
      this._doneButton.appear(45);
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  }

  // * Этот метод надо вызывать перед закрытием сообщения
  end() {
    var history, i, j, key, len, ref;
    if (this._isHistoryMode === true) {
      return;
    }
    $gameSystem.pkdGetOldMessagesList().push(this._msgEvId);
    key = this.messageData.name;
    history = $gameSystem.pkdGetMessagesHistory();
    if (history[key] == null) {
      history[key] = [];
    }
    if (this._isInteractiveHistoryMode === true) {
      history[key] = this._historyData;
    } else {
      ref = this._historyData;
      for (j = 0, len = ref.length; j < len; j++) {
        i = ref[j];
        history[key].push(i);
      }
    }
  }

  update() {
    super.update();
    if (this._needDrawNextMessage === true) {
      this._drawChatMessages();
    }
    // * ТОЛЬКО КОГДА СООБЩЕНИЕ ПРОЧИТАНО
    if (this._isEnded === true) {
      if (this._canSlideMessage === true) { //2
        this._slideMessage();
      }
    }
    if (Input.isTriggered('ok')) {
      if (this._isEnded === true) {
        this._onDoneBClick();
      }
    }
    if (this._isWaitPlayerChoice()) {
      this._updateChoiceKeyboardInput();
    }
  }

  _drawChatMessages() {
    this._showMsgTimer--;
    if (this._showMsgTimer <= 0) {
      return this._showNextMessage();
    }
  }

  _showNextMessage() {
    var nextMsg;
    this._needDrawNextMessage = false;
    nextMsg = this._getNextMessage(); //1
    if (nextMsg != null) {
      this._drawChatMsg(nextMsg); //3
      this.nextMsgIndex++;
      this._processNextMessage();
    } else if (this.isNextIsPlayerChoice()) {
      this._showPlayerChoice(); //2
    } else {
      // * END!
      this.finish();
    }
  }

  _processNextMessage() {
    this._needDrawNextMessage = true;
    return this._showMsgTimer = 50;
  }

  isNextIsPlayerChoice() {
    return this._playerChoice != null;
  }

};


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ PKD_SpriteMessageScreen.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //$[ENCODE]

  //@[DEFINES]
  _ = PKD_SpriteMessageScreen.prototype;
  _._prepareMessages = function() {
    this._branch = {};
    this.nextMsgIndex = 0;
    this.indent = 0;
    this._index = 0;
    this.list = this._getProperMessageBody(this._msgEvId);
  };
  _._getProperMessageBody = function(evId) {
    var e;
    try {
      if (isFinite(evId)) {
        return $dataCommonEvents[parseInt(evId)].list;
      } else {
        if (evId.contains("fromMap_")) {
          evId = parseInt(evId.replace("fromMap_", ""));
          if (evId > 0 && DataManager.pkdIsPhoneMessagesMapIsValid()) {
            if ($dataPKDPMsgMap.events[evId] != null) {
              return $dataPKDPMsgMap.events[evId].pages[0].list;
            }
          }
        }
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return [];
  };
  _._getNextMessage = function() {
    var item, text;
    this._skipBadCommands();
    text = null;
    this._playerChoice = null;
    item = this.list[this._index];
    if (item == null) {
      return null;
    }
    if (item.code === 102) {
      this._playerChoice = item;
      this.indent = item.indent;
    } else if (item.code === 401) {
      text = item.parameters[0];
      this.indent = item.indent;
    } else if (item.code === 402) {
      this.indent = item.indent;
      if (this._branch[this.indent] !== item.parameters[0]) {
        this._skipBranch();
      }
      this._index++;
      text = this._getNextMessage();
    }
    this._index++;
    text = PKD_PhoneMenu.Utils.ConvertEscapeCodes(text);
    return text;
  };
  _._skipBranch = function() {
    var results;
    results = [];
    while (this.list[this._index + 1].indent > this.indent) {
      results.push(this._index++);
    }
    return results;
  };
  _._skipBadCommands = function() {
    var item;
    if (this._index >= this.list.length - 1) {
      return;
    }
    item = this.list[this._index];
    if (item == null) {
      return;
    }
    this._executeSpecialCommand(item);
    while (item.code !== 102 && item.code !== 401 && item.code !== 402) {
      this._index++;
      item = this.list[this._index];
      if (item == null) {
        return;
      }
    }
  };
  _._executeSpecialCommand = function(item) {
    var e, singleLineCommand;
    try {
      if (![117, 121, 122, 355, 356].contains(item.code)) {
        return;
      }
      singleLineCommand = this._buildCommandForItem(item);
      if (singleLineCommand != null) {
        return PKD_PhoneMenu.ExecuteSingleCmdInMessage(singleLineCommand);
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _._buildCommandForItem = function(item) {
    var e, list;
    try {
      list = [item];
      list.push[{
        code: 0,
        indent: 0,
        parameters: []
      }];
      return list;
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return null;
    }
  };
})();

// ■ END PKD_SpriteMessageScreen.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ PKD_SpriteMessageScreen.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //$[ENCODE]

  //@[DEFINES]
  _ = PKD_SpriteMessageScreen.prototype;
  _._slideMessage = function() {
    var threshold;
    threshold = 20;
    if (TouchInput.wheelY >= threshold) {
      this._slideMessageDown();
      return;
    }
    if (TouchInput.wheelY <= -threshold) {
      this._slideMessageUp();
    }
  };
  _._slideMessageUp = function() {
    if (this.msgContents.y < 0) {
      return this.msgContents.y += this._hSingleMsg;
    }
  };
  _._slideMessageDown = function() {
    if (this.msgContents.y > (this._visibleMessagesHeight - this._realMessagesHeight)) {
      this.msgContents.y -= this._hSingleMsg;
    }
  };
  _._showPlayerChoice = function() {
    var t1, t2;
    if (!this._choiceIsCreated) {
      this._createPlayerChoices();
    }
    this._choiceButtonA.visible = true;
    // this._choiceButtonB.visible = true; //edit
    this._choiceButtonA.appear(45);
    this._choiceButtonB.appear(45);
    t1 = this._playerChoice.parameters[0][0];
    t2 = this._playerChoice.parameters[0][1];
    if (!String.any(t1)) {
      this._choiceButtonA.disable();
    } else {
      this._choiceButtonA.enable();
    }
    if (!String.any(t2)) {
      this._choiceButtonB.disable();
      this._choiceButtonB.visible = false;//edit
    } else {
      this._choiceButtonB.enable();
      this._choiceButtonB.visible = true;//edit
    }
    this._choiceTextA.draw(t1);
    this._choiceTextB.draw(t2);
  };
  _._isWaitPlayerChoice = function() {
    return (this._choiceButtonA != null) && this._choiceButtonA.visible === true;
  };
  _._hidePlayerChoices = function() {
    if (!this._choiceIsCreated) {
      return;
    }
    this._choiceButtonA.visible = false;
    this._choiceButtonB.visible = false;
  };
  _._createPlayerChoices = function() {
    var buttonImage, p, screenSize;
    buttonImage = ImageManager.loadPictureForPhone('btnChoice_00');
    screenSize = PKD_PhoneMenu.Utils.screenSize();
    this._choiceIsCreated = true;
    this._choiceButtonA = new KDCore.ButtonM("btnChoice", false, "pPhoneMenu");
    this._choiceButtonB = new KDCore.ButtonM("btnChoice", false, "pPhoneMenu");
    this._choiceButtonA.addClickHandler(this._onChoiceAClick.bind(this));
    this._choiceButtonB.addClickHandler(this._onChoiceBClick.bind(this));
    this._choiceButtonA.move(0, screenSize.h - buttonImage.height);
    this._choiceButtonB.move(buttonImage.width, this._choiceButtonA.y);
    //TODO: Settings for user?
    p = {
      visible: true,
      size: {
        w: buttonImage.width - 2,
        h: buttonImage.height
      },
      alignment: "center",
      font: {
        face: null,
        size: 16,
        italic: false
      },
      margins: {
        x: 1,
        y: 0
      },
      outline: {
        color: null,
        width: 2
      },
      textColor: "#FFFFFF",
      shadow: {
        color: "#000",
        opacity: 200,
        margins: {
          x: 1,
          y: 1
        }
      }
    };
    this._choiceTextA = new KDCore.UI.Sprite_UIText(p);
    this._choiceTextB = new KDCore.UI.Sprite_UIText(p);
    this._choiceButtonA.addChild(this._choiceTextA);
    this._choiceButtonB.addChild(this._choiceTextB);
    this._choiceButtonA.opacity = 0;
    this._choiceButtonB.opacity = 0;
    this.addChild(this._choiceButtonA);
    this.addChild(this._choiceButtonB);
  };
  _._onChoiceAClick = function() {
    return this._onChoiceClickCommon(0, this._playerChoice.parameters[0][0]);
  };
  _._onChoiceBClick = function() {
    return this._onChoiceClickCommon(1, this._playerChoice.parameters[0][1]);
  };
  _._updateChoiceKeyboardInput = function() {
    if (Input.isTriggered('left')) {
      this._onChoiceAClick();
    } else if (Input.isTriggered('right')) {
      this._onChoiceBClick();
    }
  };
  _._onChoiceClickCommon = function(indent, text) {
    this._branch[this.indent] = indent;
    this._hidePlayerChoices();
    this.drawChatMsgFromPl(text);
    this.nextMsgIndex++;
    this._processNextMessage();
  };
  _._onDoneBClick = function() {
    var e;
    try {
      if (this.backCallback != null) {
        return this.backCallback();
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _._createDoneButton = function() {
    var buttonImage, screenSize;
    buttonImage = ImageManager.loadPictureForPhone('btnDone_00');
    screenSize = PKD_PhoneMenu.Utils.screenSize();
    this._doneButton = new KDCore.ButtonM("btnDone", false, "pPhoneMenu");
    this._doneButton.addClickHandler(this._onDoneBClick.bind(this));
    this._doneButton.move(0, screenSize.h - buttonImage.height);
    this._doneButton.opacity = 0;
    this._doneButton.visible = false;
    this.addChild(this._doneButton);
  };
})();

// ■ END PKD_SpriteMessageScreen.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ PKD_SpriteMessageScreen.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //$[ENCODE]

  //@[DEFINES]
  _ = PKD_SpriteMessageScreen.prototype;
  _._drawChatMsg = function(text) {
    SoundManager.playCursor();
    return this._drawChatMsgCommon(text, false);
  };
  _.drawChatMsgFromPl = function(text) {
    return this._drawChatMsgCommon(text, true);
  };
  _._drawHistoryMessages = function() {
    var data, i, j, len;
    this.nextMsgIndex = 0;
    data = this._historyData;
    if (this._isInteractiveHistoryMode === true) {
      data = this._historyDataBefore;
    }
    for (j = 0, len = data.length; j < len; j++) {
      i = data[j];
      if (i[1] === 'left') {
        this._drawChatMsgCommon(i[0], false);
      } else {
        this._drawChatMsgCommon(i[0], true);
      }
      this.nextMsgIndex++;
    }
    if (this._isInteractiveHistoryMode === false) {
      this.finish();
    }
  };
  _._drawChatMsgCommon = function(text, isFromPlayer = false) {
    var msg, msgBack, msgBackColor, p, side, w, w2;
    p = PKD_PhoneMenu.PP.getMessagesStyleSettings();
    w = PKD_PhoneMenu.Utils.screenSize().w - 12;
    msgBack = new KDCore.Sprite(new Bitmap(w, this._hSingleMsg));
    msg = new Sprite(new Bitmap(w, this._hSingleMsg));
    if (isFromPlayer === true) {
      msg.bitmap.textColor = p.playerMessageTextColor;
      msg.bitmap.fontSize = p.playerMessageFontSize;
      side = p.playerMessagePosition;
      msg.bitmap.drawTextFull(text, side);
      if (this._isHistoryMode === false) {
        this._historyData.push([text, side]);
      }
    } else {
      side = p.charMessagePosition;
      msg.bitmap.textColor = p.charMessageTextColor;
      msg.bitmap.fontSize = p.charMessageFontSize;
      msg.bitmap.drawTextFull(text, side);
      if (this._isHistoryMode === false) {
        this._historyData.push([text, side]);
      }
    }
    msgBack.y = this.nextMsgIndex * (this._hSingleMsg + 4);
    w2 = msg.bitmap.measureTextWidth(text) + 10;
    msg.x = 5;
    msgBack.addChild(msg);
    if (isFromPlayer === true) {
      msgBackColor = p.playerBackRectColor;
      msgBack.bitmap.fillRect(w - w2, 0, w2, this._hSingleMsg, msgBackColor);
      msgBack.x += 12;
      msg.x -= 10;
    } else {
      msgBackColor = p.charBackRectColor;
      msgBack.bitmap.fillRect(0, 0, w2, this._hSingleMsg, msgBackColor);
      
    }
    this.msgContents.addChild(msgBack);
    msgBack.appear(45); //original
    this._realMessagesHeight += this._hSingleMsg;
    return this._moveMessages();
  };
  _._moveMessages = function() {
    var diff;
    if ((this._realMessagesHeight + this._hSingleMsg) >= this._visibleMessagesHeight) {
      this._canSlideMessage = true; // * можем использовать скролл
      diff = this._realMessagesHeight - this._visibleMessagesHeight;
      this.msgContents.y = -diff;
    }
  };
})();

// ■ END PKD_SpriteMessageScreen.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
var PKD_SpritePhoneAppGalleryContext;

PKD_SpritePhoneAppGalleryContext = class PKD_SpritePhoneAppGalleryContext extends PKD_SpritePhoneAppContext {
  constructor() {
    super();
    this._inAlbum = false;
  }

  _loadAppData() {
    return PKD_PhoneMenu.Utils.GetAppData("galleryApp");
  }

  _defaultAppBackgroundBitmap() {
    var imageName;
    imageName = $gameSystem.pkdGetPhone().galleryWallpaper;
    if (!String.any(imageName)) {
      imageName = "galleryBackground";
    }
    return ImageManager.loadPictureForPhone(imageName);
  }

  _createContent() {
    this._createAlbumsList();
  }

  backHandler(phone) {
    if (!this._inAlbum) {
      return super.backHandler(phone);
    } else {
      return this._backFromAlbumScreen();
    }
  }

  _createAlbumsList() {
    var r;
    r = this.getAppRect();
    if (KDCore.isMZ()) {
      this._albums = new PKD_Window_PhoneGalleryAlbumsList(r);
    } else {
      this._albums = new PKD_Window_PhoneGalleryAlbumsList(r.x, r.y, r.width, r.height);
    }
    this._albums.setHandler('ok', this._onAlbumSelected.bind(this));
    this._albums.hide();
    this.addChild(this._albums);
  }

  _onAlbumSelected() {
    this._albums.hide();
    this._inAlbum = true;
    this._createGalleryGridScreen(this._albums.selectedAlbum());
  }

  _createGalleryGridScreen(albumName) {
    this._galleryGridScreen = new PKD_SpriteGalleryGridScreen(albumName);
    this._galleryGridScreen.backCallback = this._backFromAlbumScreen.bind(this);
    this.addChild(this._galleryGridScreen);
  }

  _backFromAlbumScreen() {
    //* From PICTURE to grid back (if zoomed), then from Grid (if not)
    if (this._galleryGridScreen.isShowPictureMode()) {
      this._galleryGridScreen.endShowPicture();
    } else {
      this.removeChild(this._galleryGridScreen);
      this._inAlbum = false;
      this.showContent();
    }
    Input.clear();
    TouchInput.clear();
  }

  showContent() {
    PKD_PhoneMenu.Utils.SetPhoneTopText(this._appData.name);
    this._albums.refresh();
    this._albums.safeSelect();
    this._albums.activate();
    this._albums.show();
  }

};


// Generated by CoffeeScript 2.6.1
var PKD_SpritePhoneAppItem;

PKD_SpritePhoneAppItem = class PKD_SpritePhoneAppItem extends KDCore.UI.Sprite_UIElement {
  constructor(params) {
    super(params);
    this._isManualHoveredState = false;
    this._isBeenUnderMouse = false;
    this._changer = null;
    this._clickChanger = null;
    this._scaleFactor = this.initialScale();
    this.scale.set(this._scaleFactor);
    this._canExecute = false;
    return;
  }

  update() {
    var ref;
    super.update();
    this._updateHoverUnHoverAnimation();
    if ((ref = this._clickChanger) != null) {
      ref.update();
    }
  }

  initialScale() {
    return 0.85;
  }

  topScale() {
    return 1.0;
  }

  setTextField(textField) {
    this.textField = textField;
  }

  refresh() {
    var e;
    if (this._alertIcon == null) {
      return;
    }
    try {
      return this._alertIcon.visible = $gameSwitches.value(this.params.alertSwitchId);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  //$[OVER]
  isActive() {
    return true;
  }

  isCanExecuteAction() {
    return this._canExecute === true;
  }

  requestActionExecution() {
    if (this._isDisabled === true) {
      return;
    }
    this.playClickEffect();
  }

  getActionForExecution() {
    return {
      ev: this.params.commonEventId,
      isOuter: this.params.isOuterStart
    };
  }

  onActionExecuted() {
    this._canExecute = false;
    // * Если приложение было запущенно, сбросить переключатель
    if (this.params.alertSwitchId > 0) {
      $gameSwitches.setValue(this.params.alertSwitchId, false);
    }
  }

  //$[OVER]
  rootImageFolder() {
    return "pPhoneMenu";
  }

  alignWithSlot() {
    if (this.parent == null) {
      return;
    }
    this.x = this.parent.width / 2;
    return this.y = this.parent.height / 2;
  }

  //$[OVER]
  _resetPosition() {
    var ref;
    this.x = this.y = 0;
    this.anchor.set(0.5);
    if ((ref = this.zeroChild()) != null) {
      ref.anchor.set(0.5);
    }
  }

  setManualHoveredState() {
    this._isManualSelectedItem = false;
    this._isManualSelectionMode = true;
    this._startAnimateOut();
  }

  resetManualHoveredState() {
    this._isManualSelectedItem = false;
    this._isManualSelectionMode = false;
    this._startAnimateOut();
  }

  isManualSelected() {
    return this._isManualSelectedItem === true;
  }

  manualSelect() {
    this._startAnimateIn();
    this._isManualSelectedItem = true;
  }

  isSelected() {
    return this.isUnderMouse() || this.isManualSelected();
  }

  disableApp() {
    this._isDisabled = true;
    return this.desaturate();
  }

  playClickEffect() {
    var fromY, toY;
    this._clickChanger = new KDCore.Changer(this._appButton);
    this._clickChanger.change('y');
    this._appButton.y = 0;
    fromY = 0;
    toY = 6;
    this._clickChanger.from(fromY).to(toY).step(3).repeat(3).reverse().done(() => {
      this._appButton.y = 0;
      this._canExecute = true;
      return this._clickChanger = null;
    });
    this._clickChanger.start();
  }

  resetAllAnimations() {
    this._changer = null;
    this._clickChanger = null;
    this._appButton.y = 0;
    this.scale.set(this.initialScale());
  }

  _updateHoverUnHoverAnimation() {
    var ref;
    if ((ref = this._changer) != null) {
      ref.update();
    }
    this._updateScaleFactor();
    if (this._isManualSelectionMode === true) {
      return;
    }
    if (this.isUnderMouse()) {
      if (this._isBeenUnderMouse === false) {
        this._isBeenUnderMouse = true;
        this._startAnimateIn();
      }
    } else {
      if (this._isBeenUnderMouse === true) {
        this._startAnimateOut();
        this._isBeenUnderMouse = false;
      }
    }
  }

  _updateScaleFactor() {
    if (this._changer == null) {
      return;
    }
    return this.scale.set(this._scaleFactor);
  }

  _startAnimateIn() {
    var curValue, finalValue;
    // * No moveIn if started!
    if (this._clickChanger != null) {
      return;
    }
    this._changer = new KDCore.Changer(this);
    curValue = this._scaleFactor;
    finalValue = this.topScale();
    this._changer.change('_scaleFactor').from(curValue).to(finalValue).step(0.05);
    this._changer.start();
    this._changer.done(() => {
      this._scaleFactor = this.topScale();
      this._updateScaleFactor();
      return this._changer = null;
    });
    setTimeout((() => {
      var ref;
      return (ref = this.textField) != null ? ref.draw(this.params.name) : void 0;
    }), 100);
  }

  _startAnimateOut() {
    var curValue, finalValue, ref;
    // * No moveOut if started!
    if (this._clickChanger != null) {
      return;
    }
    this._changer = new KDCore.Changer(this);
    curValue = this._scaleFactor;
    finalValue = this.initialScale();
    this._changer.change('_scaleFactor').from(curValue).to(finalValue).step(0.1);
    this._changer.start();
    this._changer.done(() => {
      this._scaleFactor = this.initialScale();
      this._updateScaleFactor();
      return this._changer = null;
    });
    if ((ref = this.textField) != null) {
      ref.draw("");
    }
  }

  _prepare() {
    super._prepare();
    return this.visible = true; // * always
  }

  _createContent() {
    this._createButton();
    this._createAlertIcon();
    return this._resetPosition();
  }

  _createButton() {
    var imageName;
    imageName = this.params.icon;
    this._appButton = new KDCore.ButtonMU({
      main: imageName,
      hover: imageName,
      disabled: imageName
    }, false, this.rootImageFolder());
    this._appButton.addClickHandler(() => {
      return this.requestActionExecution();
    });
    return this.add(this._appButton);
  }

  _createAlertIcon() {
    var e;
    try {
      if (this.params.alertSwitchId <= 0) {
        return;
      }
      this._alertIcon = new KDCore.Sprite(ImageManager.loadPictureForPhone("AppIcon_Alert"));
      this._alertIcon.anchor.set(0.5);
      this._appButton.addChild(this._alertIcon);
      return this.refresh();
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

};


// Generated by CoffeeScript 2.6.1
var PKD_SpritePhoneAppMessagesContext;

PKD_SpritePhoneAppMessagesContext = class PKD_SpritePhoneAppMessagesContext extends PKD_SpritePhoneAppContext {
  constructor() {
    super();
    this._inMessage = false;
  }

  _loadAppData() {
    return PKD_PhoneMenu.Utils.GetAppData("messagesApp");
  }

  _defaultAppBackgroundBitmap() {
    var imageName;
    imageName = $gameSystem.pkdGetPhone().messagesWallpaper;
    if (!String.any(imageName)) {
      imageName = "messagesBackground";
    }
    return ImageManager.loadPictureForPhone(imageName);
  }

  _createContent() {
    this._createMessagesList();
  }

  backHandler(phone) {
    PKD_PhoneMenu.Utils.refreshMessagesAppAlert();
    if (!this._inMessage) {
      super.backHandler(phone);
    } else {
      this._backFromMessageScreen();
    }
    Input.clear();
    TouchInput.clear();
  }

  _createMessagesList() {
    var r;
    r = this._getPMLRect();
    if (KDCore.isMZ()) {
      this._messages = new PKD_Window_PhoneMessagesList(r);
    } else {
      this._messages = new PKD_Window_PhoneMessagesList(r.x, r.y, r.width, r.height);
    }
    this._messages.setHandler('ok', this._onMsgSelected.bind(this));
    this._messages.hide();
    this.addChild(this._messages);
  }

  _onMsgSelected() {
    this._messages.hide();
    this._inMessage = true;
    this._createMessageScreen(this._messages.selectedMessage());
  }

  _createMessageScreen(msgData) {
    this._messageScreen = new PKD_SpriteMessageScreen(msgData);
    this._messageScreen.backCallback = this._backFromMessageScreen.bind(this);
    this.addChild(this._messageScreen);
  }

  _backFromMessageScreen() {
    if (this._messageScreen.isEnded()) {
      this._messageScreen.end();
      this.removeChild(this._messageScreen);
      this._inMessage = false;
      return this.showContent();
    } else {
      return SoundManager.playBuzzer();
    }
  }

  _getPMLRect() {
    var h, w;
    ({w, h} = this.screenSize());
    return {
      x: 0,
      y: 0,
      width: w,
      height: h
    };
  }

  showContent() {
    PKD_PhoneMenu.Utils.SetPhoneTopText(this._appData.name);
    this._messages.refresh();
    this._messages.safeSelect();
    this._messages.activate();
    return this._messages.show();
  }

};


// Generated by CoffeeScript 2.6.1
var PKD_SpritePhoneIcon;

PKD_SpritePhoneIcon = class PKD_SpritePhoneIcon extends KDCore.Sprite {
  constructor() {
    super();
    this._create();
    this.opacity = 0;
    this.refreshAlertSymbol();
    this.appear(50, 10);
    return;
  }

  refreshAlertSymbol() {
    var ref;
    return (ref = this._alertIcon) != null ? ref.visible = PKD_PhoneMenu.IsHaveNewMessages() : void 0;
  }

  _create() {
    var e, mapIconPosition;
    ({mapIconPosition} = PKD_PhoneMenu.PP.getPhoneSettings());
    this._createPhoneButton();
    this._createAlertIcon();
    try {
      this.move(mapIconPosition);
    } catch (error) {
      e = error;
      KDCore.warning(e);
      this.move(0, 0);
    }
  }

  _createPhoneButton() {
    this._button = new KDCore.ButtonM("PhoneIcon", false, "pPhoneMenu");
    this._button.addClickHandler(() => {
      if (this.opacity === 255 && this.visible === true) {
        return PKD_PhoneMenu.Show();
      }
    });
    return this.addChild(this._button);
  }

  _createAlertIcon() {
    this._alertIcon = new Sprite(ImageManager.loadPictureForPhone("PhoneIcon_Alert"));
    return this.addChild(this._alertIcon);
  }

};


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ PKD_SpritePhoneMapNotify.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
var PKD_SpritePhoneMapNotify;

PKD_SpritePhoneMapNotify = class PKD_SpritePhoneMapNotify extends KDCore.Sprite {
  constructor(params) {
    super();
    this.params = params;
    this._create();
    this._threads = [];
    this._isAlive = true;
    this._isSoundPlayed = false;
    this._scaleFactor = this.getSettings().initialScale;
    this.anchor.x = 0.5;
    this.scale.x = this.scale.y = this._scaleFactor;
    this._refreshInitalPlacement();
    this.appear(this.getSettings().appearSpeed);
    this._initScaleUpThread();
    this._initLiveTimer();
    return;
  }

  destroyNotify() {
    this.visible = false;
    return this.removeFromParent();
  }

  isAlive() {
    return this._isAlive === true;
  }

  _refreshInitalPlacement() {
    var e, x, y;
    ({x, y} = this.getSettings().position);
    try {
      this.x = eval(x);
    } catch (error) {
      e = error;
      KDCore.warning(e);
      this.x = 0;
    }
    try {
      this.y = eval(y);
    } catch (error) {
      e = error;
      KDCore.warning(e);
      this.y = 0;
    }
  }

  update() {
    var i, len, ref, t;
    super.update();
    if (!this.visible) {
      return;
    }
    if (!this._isSoundPlayed) {
      if (this.opacity > 200) {
        this._playSE();
      }
    }
    ref = this._threads;
    for (i = 0, len = ref.length; i < len; i++) {
      t = ref[i];
      if (t != null) {
        t.update();
      }
    }
    this.scale.x = this.scale.y = this._scaleFactor;
  }

  getSettings() {
    return PKD_PhoneMenu.PP.getNotificationSettings();
  }

  _playSE() {
    var e;
    this._isSoundPlayed = true;
    if (!String.any(this.params.se)) {
      return;
    }
    try {
      if ($gameTemp._pkdLastPhoneNotifySoundPlayed == null) {
        KDCore.Utils.playSE(this.params.se);
        return $gameTemp._pkdLastPhoneNotifySoundPlayed = true;
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  _create() {
    var e;
    if (String.any(this.params.image)) {
      this._createBackgroundImage();
    }
    try {
      if (String.any(this.params.text)) {
        this._createText();
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  }

  _createBackgroundImage() {
    var image;
    image = this.params.image;
    this.bitmap = ImageManager.loadPictureForPhone(image);
  }

  _createText() {
    var e, fontSize, p, text, textSpr, x, y;
    text = this.params.text;
    x = this.params.textPos[0] || 0;
    y = this.params.textPos[1] || 0;
    fontSize = this.getSettings().defaultFontSize;
    p = {
      visible: true,
      size: {
        w: Graphics.width,
        h: Graphics.height
      },
      font: {
        face: null,
        size: fontSize,
        italic: false
      },
      margins: {
        x: 0,
        y: 0
      },
      singleLine: false,
      forceCentered: false
    };
    textSpr = new KDCore.UI.Sprite_UITextExt(p);
    textSpr.draw(text);
    try {
      textSpr.move(x, y);
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    if (this.bitmap.isReady()) {
      textSpr.x -= this.bitmap.width / 2;
    } else {
      this.tSprite = textSpr;
      this.bitmap.addLoadListener(() => {
        return this.tSprite.x -= this.bitmap.width / 2;
      });
    }
    return this.addChild(textSpr);
  }

  _initScaleUpThread() {
    var changer, end, start;
    changer = new KDCore.Changer(this);
    start = this.scale.x;
    end = this.getSettings().finalScale;
    if (start === end) {
      return;
    }
    changer.change("_scaleFactor").from(start).to(end).step(0.05);
    changer.start();
    this._threads.push(changer);
  }

  _initLiveTimer() {
    var liveTime, liveTimeThread;
    liveTime = this.getSettings().stayTime;
    liveTimeThread = new KDCore.TimedUpdate(liveTime, this._onLiveEnd.bind(this));
    liveTimeThread.once();
    return this._threads.push(liveTimeThread);
  }

  _onLiveEnd() {
    this._threads = [];
    this._isAlive = false;
    this._moveOut();
  }

  _moveOut() {
    var changer, changer2, curY, finalY, step;
    if (this.parent === null) {
      return;
    }
    step = this.getSettings().disappearSpeed;
    changer = new KDCore.Changer(this);
    changer.change('opacity').from(255).to(0).step(step).speed(2).done(() => {
      return this.destroyNotify();
    });
    changer.start();
    changer2 = new KDCore.Changer(this);
    curY = this.y;
    if (this.getSettings().isMoveDownWhenMoveOut) {
      finalY = 10000;
    } else {
      finalY = -10000;
    }
    step = this.getSettings().moveOutSpeed;
    changer2.change('y').from(curY).to(finalY).step(step);
    changer2.start();
    this._threads.push(changer);
    this._threads.push(changer2);
  }

};

// ■ END PKD_SpritePhoneMapNotify.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
var PKD_SpritePhoneModalMenu;

PKD_SpritePhoneModalMenu = class PKD_SpritePhoneModalMenu extends KDCore.Sprite {
  constructor(menuData) {
    super();
    this.menuData = menuData;
    this._create();
    this._refreshPlacement();
  }

  getSettings() {
    return PKD_PhoneMenu.PP.getModalMenuSettings();
  }

  getMenuData() {
    return this.menuData;
  }

  update() {
    super.update();
    return this._options.update();
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PKD_SpritePhoneModalMenu.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = PKD_SpritePhoneModalMenu.prototype;
  _._refreshPlacement = function() {
    var rect;
    rect = PKD_PhoneMenu.Utils.getAppRect();
    this._modalMenuSprite.x = rect.width / 2 - this._modalMenuSprite.width / 2;
    this._modalMenuSprite.y = rect.height / 2 - this._modalMenuSprite.height / 2;
  };
  _._create = function() {
    //@_createBackSprite()
    this._createModalMenuSprite();
    this._createTitleTextSprite();
    this._createOptions();
  };
  /*_._createBackSprite = ->
  rect = PKD_PhoneMenu.Utils.getAppRect()
  @_backSprite = new Sprite(new Bitmap(rect.width, rect.height))
  @_backSprite.bitmap.fillAll @getSettings().backColor
  @_backSprite.opacity = @getSettings().backOpacity
  @addChild @_backSprite*/
  _._createModalMenuSprite = function() {
    var h, w;
    w = this.getSettings().width;
    h = this._calculateTotalHeight();
    this._modalMenuSprite = new Sprite(new Bitmap(w, h));
    this._modalMenuSprite.bitmap.fillAll(this.getSettings().menuColor);
    this.addChild(this._modalMenuSprite);
  };
  _._calculateTotalHeight = function() {
    var e, h, i, j, optionsCount, ref;
    try {
      h = 0;
      h += this.getSettings().titleHeight;
      optionsCount = this.getMenuData().options.length;
      for (i = j = 0, ref = optionsCount; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
        h += this.getSettings().optionLineHeight;
      }
      return h + (this.getSettings().padding * 2);
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return 300;
    }
  };
  _._createTitleTextSprite = function() {
    var e, p;
    try {
      if ($ppJson_ModalMenuTitleTextSettings) {
        p = $ppJson_ModalMenuTitleTextSettings;
      } else {
        p = {
          visible: true,
          size: {
            w: 200,
            h: 60
          },
          alignment: "center",
          font: {
            face: null,
            size: 18,
            italic: false
          },
          margins: {
            x: 0,
            y: 0
          },
          outline: {
            color: "#000",
            width: 0.5
          },
          textColor: "#000",
          shadow: null
        };
      }
      this.titleText = new KDCore.UI.Sprite_UIText(p);
      this.titleText.draw(this.getMenuData().titleText);
      return this._modalMenuSprite.addChild(this.titleText);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _._createOptions = function() {
    var buttons, e, index, item, j, len, option, ref;
    try {
      buttons = [];
      ref = this.getMenuData().options;
      for (index = j = 0, len = ref.length; j < len; index = ++j) {
        option = ref[index];
        item = this._createOptionItem(index, option);
        if (item != null) {
          buttons.push(item);
        }
      }
      return this._options = new PKD_ButtonsListChoice(...buttons);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _._createOptionItem = function(index, {title, action}) {
    var e, h, optionButton;
    try {
      optionButton = new KDCore.ButtonM("ModalMenuOptionItem", false, "pPhoneMenu");
      optionButton.optionIndex = index;
      optionButton.addClickHandler(this._onOptionClick.bind(this, action));
      this._createTitleForOptionItem(title, optionButton);
      h = this._calculateYForOption(index);
      optionButton.move(0, h);
      this._modalMenuSprite.addChild(optionButton);
      return optionButton;
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return null;
    }
  };
  _._createTitleForOptionItem = function(title, item) {
    var e, optionTitleText, p;
    try {
      if (typeof $ppJson_ModalMenuOptionSettings !== "undefined" && $ppJson_ModalMenuOptionSettings !== null) {
        p = $ppJson_ModalMenuOptionSettings;
      } else {
        p = {
          visible: true,
          size: {
            w: 200,
            h: 40
          },
          alignment: "center",
          font: {
            face: null,
            size: 12,
            italic: false
          },
          margins: {
            x: 0,
            y: 0
          },
          outline: {
            color: "#3f8ad4",
            width: 0.1
          },
          textColor: "#3f8ad4",
          shadow: null
        };
      }
      optionTitleText = new KDCore.UI.Sprite_UIText(p);
      optionTitleText.draw(title);
      return item.addChild(optionTitleText);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _._calculateYForOption = function(index) {
    var h, s;
    s = this.getSettings();
    h = s.padding;
    h += s.titleHeight;
    h += s.optionLineHeight * index;
    return h;
  };
  _._onOptionClick = function(action) {
    var context, e, startCommonEvent;
    try {
      context = SceneManager._scene;
      if (action == null) {
        context.appContextBackHandlerCall();
        return;
      }
      startCommonEvent = function(list) {
        var e;
        try {
          context._startInnerCe(list);
          return context.refresh();
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      };
      if (typeof action === "string") {
        try {
          if (String.any(action)) {
            eval(action);
          }
        } catch (error) {
          e = error;
          KDCore.warning(e);
        }
      } else if (typeof action === "number") {
        try {
          if (KDCore.Utils.isValidCE(action)) {
            startCommonEvent($dataCommonEvents[action].list);
          }
        } catch (error) {
          e = error;
          KDCore.warning(e);
        }
      } else if (typeof action === "object") {
        // * Already LIST of commands
        startCommonEvent(action);
      } else {
        console.log("Action is of an unknown Action type");
      }
      try {
        // * CLOSING MENU
        return context.appContextBackHandlerCall();
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
})();

// ■ END PKD_SpritePhoneModalMenu.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
var PKD_SpritePhoneModalMenuContext;

PKD_SpritePhoneModalMenuContext = class PKD_SpritePhoneModalMenuContext extends PKD_SpritePhoneAppContext {
  constructor() {
    super();
  }

  _loadAppData() {
    return {
      name: ""
    };
  }

  onClosing() {
    return $gameTemp._pkdPhoneModalMenuData = null;
  }

  _defaultAppBackgroundBitmap() {} // * EMPTY

  _animateAppear() {
    return this.onAnimatinDone();
  }

  _createContent() {
    this.modalMenu = new PKD_SpritePhoneModalMenu($gameTemp._pkdPhoneModalMenuData);
    return this.addChild(this.modalMenu);
  }

};


// Generated by CoffeeScript 2.6.1
var PKD_Window_PhoneGalleryAlbumsList;

PKD_Window_PhoneGalleryAlbumsList = class PKD_Window_PhoneGalleryAlbumsList extends Window_Selectable {
  constructor() {
    super(...arguments);
    this.setBackgroundType(2);
    this.refresh();
  }

  maxItems() {
    return PKD_PhoneMenu.Utils.getAllGalleryAlbums().length;
  }

  itemHeight() {
    return 54;
  }

  safeSelect() {
    if (this.maxItems() > 0) {
      return this.select(0);
    } else {
      return this.select(-1);
    }
  }

  selectedAlbum() {
    return this.getAlbumName(this.index());
  }

  drawItem(index) {
    var d, e, rect;
    rect = this.itemRect(index);
    d = this.getAlbumName(index);
    if (d == null) {
      return;
    }
    try {
      this._drawAlbumName(d, rect);
      return this._drawAlbumItemsCount(this._imagesCountPerAlbumName(d), rect);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  _imagesCountPerAlbumName(name) {
    return PKD_PhoneMenu.Utils.getOpenedImagesCountPerAlbum(name);
  }

  _drawAlbumName(name, rect) {
    this.contents.fontSize = 18;
    this.drawText(name, rect.x + 10, rect.y + 7);
    return this.resetFontSettings();
  }

  _drawAlbumItemsCount(count, rect) {
    var dx;
    this.contents.textColor = "#dddddd";
    this.contents.fontSize = 18;
    dx = 36;
    if (count > 999) {
      this.contents.fontSize = 12;
      dx = 44;
    } else if (count > 99) {
      this.contents.fontSize = 14;
      dx = 42;
    } else if (count > 9) {
      this.contents.fontSize = 16;
      dx = 40;
    }
    this.drawText("[" + count + "]", rect.x + rect.width - dx, rect.y);
    return this.resetFontSettings();
  }

  getAlbumName(index) {
    var allMsg;
    allMsg = PKD_PhoneMenu.Utils.getAllGalleryAlbums();
    return allMsg[index];
  }

};


// Generated by CoffeeScript 2.6.1
var PKD_Window_PhoneGalleryGrid;

PKD_Window_PhoneGalleryGrid = class PKD_Window_PhoneGalleryGrid extends Window_Selectable {
  constructor() {
    super(...arguments);
    this.setBackgroundType(2);
    this.refresh();
  }

  setAlbumName(albumName) {
    this.albumName = albumName;
    this._imagesForGrid = this._collectImagesForCurrentAlbum();
    return this.refresh();
  }

  _collectImagesForCurrentAlbum() {
    var allImages, i, image, imagesForThisGallery, len;
    allImages = PKD_PhoneMenu.Utils.getAllOpenedImagesInGallery();
    imagesForThisGallery = [];
    for (i = 0, len = allImages.length; i < len; i++) {
      image = allImages[i];
      if (image == null) {
        continue;
      }
      if (image.albumName === this.albumName) {
        imagesForThisGallery.push(image);
      }
    }
    return imagesForThisGallery;
  }

  maxItems() {
    if (this._imagesForGrid != null) {
      return this._imagesForGrid.length;
    } else {
      return 0;
    }
  }

  maxCols() {
    return PKD_PhoneMenu.PP.getGalleryAppSettings().gridCols;
  }

  itemHeight() {
    return PKD_PhoneMenu.PP.getGalleryAppSettings().previewImageHeight;
  }

  safeSelect() {
    if (this.maxItems() > 0) {
      return this.select(0);
    } else {
      return this.select(-1);
    }
  }

  selectedImage() {
    return this.getImageData(this.index());
  }

  drawItem(index) {
    var d, e, imageNameToDraw, rect;
    rect = this.itemRect(index);
    d = this.getImageData(index);
    if (d == null) {
      return;
    }
    try {
      if (String.any(d.previewPicName)) {
        imageNameToDraw = d.previewPicName;
      } else {
        imageNameToDraw = d.picName;
      }
      return this._drawGalleryGridImage(imageNameToDraw, rect);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  _drawGalleryGridImage(imageName, rect) {
    var b, e, picSizeX, picSizeY, picX, picY;
    try {
      b = ImageManager.loadPictureForPhone(imageName);
      picX = rect.x + 4;
      picY = rect.y + 4;
      picSizeX = rect.width - 8;
      picSizeY = rect.height - 8;
      return b.addLoadListener(() => {
        return this.contents.blt(b, 0, 0, b.width, b.height, picX, picY, picSizeX, picSizeY);
      });
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  getImageData(index) {
    return this._imagesForGrid[index];
  }

};


// Generated by CoffeeScript 2.6.1
var PKD_Window_PhoneMessagesList;

PKD_Window_PhoneMessagesList = class PKD_Window_PhoneMessagesList extends Window_Selectable {
  constructor() {
    super(...arguments);
    this.setBackgroundType(2);
    this.refresh();
  }

  maxItems() {
    return $gameSystem.pkdGetPhoneMessagesList().length;
  }

  itemHeight() {
    return 56;
  }

  safeSelect() {
    if (this.maxItems() > 0) {
      return this.select(0);
    } else {
      return this.select(-1);
    }
  }

  selectedMessage() {
    return this.getMessageData(this.index());
  }

  drawItem(index) {
    var d, e, rect;
    rect = this.itemRect(index);
    d = this.getMessageData(index);
    if (d == null) {
      return;
    }
    try {
      this._drawIcon(rect, $gameSystem.pkdIsNewMessageFrom(d.name));
      this._drawFace(d.avatar, rect);
      return this._drawName(d.name, rect);
    } catch (error) {
      //@_drawLineRect(rect.x, rect.y, rect.width, rect.hight) unless index == 0
      e = error;
      return KDCore.warning(e);
    }
  }

  _drawIcon(rect, isNew) {
    var backBit;
    if (isNew) {
      backBit = ImageManager.loadPictureForPhone('MessageIconNew');
    } else {
      backBit = ImageManager.loadPictureForPhone('MessageIcon');
    }
    this.contents.drawOnMe(backBit, rect.width - backBit.width, rect.y);
  }

  _drawFace(name, rect) {
    var faceBit;
    faceBit = ImageManager.loadPictureForPhone(name);
    faceBit.addLoadListener(() => {
      return this.contents.blt(faceBit, 0, 0, 48, 48, rect.x, rect.y + 2);
    });
  }

  _drawName(name, rect) {
    this.contents.fontSize = 18;
    return this.drawText(name, rect.x + 60, rect.y + 6);
  }

  //@resetFontSettings()

    //_drawLineRect: (x, y, w, h) ->
  //    c = KDCore.Color.BLACK.reAlpha(60).CSS
  //    @contents.fillRect(x, y, w, 1, c)
  getMessageData(index) {
    var allMsg;
    allMsg = $gameSystem.pkdGetPhoneMessagesList();
    return allMsg[index];
  }

};


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Base.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Base.prototype;
  _.pkdShowPhoneNotify = function(params) {
    var e;
    try {
      if (params == null) {
        return;
      }
      this._pkdPhoneNotifySprite = new PKD_SpritePhoneMapNotify(params);
      this.addChild(this._pkdPhoneNotifySprite);
      return this._pkdPhoneNotifySprite;
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return null;
  };
})();

// ■ END Scene_Base.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Boot.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__start, _;
  //@[DEFINES]
  _ = Scene_Boot.prototype;
  //@[ALIAS]
  ALIAS__start = _.start;
  _.start = function() {
    ALIAS__start.call(this, ...arguments);
    PKD_PhoneMenu.LoadPluginSettings();
    PKD_PhoneMapNotifyManager.init();
  };
})();

// ■ END Scene_Boot.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__callMenu, ALIAS__onMapLoaded, _;
  //@[DEFINES]
  _ = Scene_Map.prototype;
  //@[ALIAS]
  ALIAS__onMapLoaded = _.onMapLoaded;
  _.onMapLoaded = function() {
    $gameSystem.pkdPreparePhoneImages();
    ALIAS__onMapLoaded.call(this, ...arguments);
    PKD_PhoneMenu.Map.Show();
  };
  
  //@[ALIAS]
  ALIAS__callMenu = _.callMenu;
  _.callMenu = function() {
    if (PKD_PhoneMenu.PP.isUseAsMainMenu()) {
      SoundManager.playOk();
      SceneManager.push(PKD_ScenePhone);
      $gameTemp.clearDestination();
      this._mapNameWindow.hide();
      return this._waitCount = 2;
    } else {
      return ALIAS__callMenu.call(this, ...arguments);
    }
  };
})();

// ■ END Scene_Map.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Map.prototype;
  _.pkdRefreshPhoneIcon = function() {
    var e, ref;
    try {
      return (ref = this._pkdPhoneIcon) != null ? ref.refreshAlertSymbol() : void 0;
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.pkdShowPhoneIcon = function() {
    var ref;
    if (this._pkdPhoneIcon == null) {
      this._pkdPhoneIcon = new PKD_SpritePhoneIcon();
      this.addChild(this._pkdPhoneIcon);
    }
    if ((ref = this._pkdPhoneIcon) != null) {
      ref.visible = true;
    }
  };
  _.pkdHidePhoneIcon = function() {
    if (this._pkdPhoneIcon == null) {
      return;
    }
    this._pkdPhoneIcon.visible = false;
  };
})();

// ■ END Scene_Map.coffee
//---------------------------------------------------------------------------

//Plugin PKD_PhoneMenu builded by PKD PluginBuilder 2.2 - 20.05.2023