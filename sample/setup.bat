pushd %~dp0

path=%CD%\tools\bin;%path%

set SRCAPP=%CD%\my-app\src\app
set OUTDIR=%SRCAPP%\_pg\sc

popd
