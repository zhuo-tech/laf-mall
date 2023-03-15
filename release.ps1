Set-Location ./admin/
pnpm run build
scp -r ./dist/* ds:/app/laf-mall/admin

Set-Location ../
