Set-Location ./common/
pnpm run build

Write-Output '更新 后台管理模块 通用依赖'
Set-Location ../admin/
Remove-Item -Force -Recurse .\node_modules\common\
pnpm install

Write-Output '更新 server 模块 通用依赖'
Set-Location ../server/
Remove-Item -Force -Recurse .\node_modules\common\
pnpm install

Write-Output '更新 移动端模块 通用依赖'
Set-Location ../mp/
Remove-Item -Force -Recurse .\node_modules\common\
pnpm install

Set-Location ../
