Set-Location ./common/
pnpm install
pnpm run build

#Write-Output "安装 后台管理模块"
Set-Location ../admin/
pnpm install

#Write-Output "安装 server 模块"
Set-Location ../server/
pnpm install

#Write-Output "安装移动端模块"
Set-Location ../mp/
pnpm install

Set-Location ../
