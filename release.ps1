Set-Location ./admin/
pnpm run build
scp -r ./dist/* hus:/apps/laf-mall-admin/

Set-Location ../
