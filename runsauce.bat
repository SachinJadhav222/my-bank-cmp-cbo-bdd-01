SET PACK=sanity_all_env
SET FOLDERNAME=result2
SET ENV=cit3
SET FEATURE=TC_01_Sanity_Colleague_Create_Customer
SET BROWSER=firefox
REM Auto/Manual for SAUCECONNECT
SET SAUCECONNECT=Manual

SET SUBPACK=colleague

CALL gulp sauce --sauceconnect=%SAUCECONNECT% --ff=%FEATURE% --browser=%BROWSER% --pack=%PACK% --subpack=%SUBPACK% --folderName=%FOLDERNAME% --env=%ENV%
REM CALL gulp sauce --browser=%BROWSER% --pack=%PACK% --subpack=%SUBPACK% --folderName=%FOLDERNAME% --env=%ENV%

REM SET SUBPACK=customer

REM CALL gulp sauce --ff=%FEATURE% --browser=%BROWSER% --pack=%PACK% --subpack=%SUBPACK% --folderName=%FOLDERNAME% --env=%ENV%
REM CALL gulp sauce --browser=%BROWSER% --pack=%PACK% --subpack=%SUBPACK% --folderName=%FOLDERNAME% --env=%ENV%

CALL gulp multiHtmlreport --folderName=%FOLDERNAME%





