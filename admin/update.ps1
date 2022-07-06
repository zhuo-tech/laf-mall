Set-Location ../common/
yarn build

Set-Location ../admin/
Remove-Item -Force -Recurse .\node_modules\common\

pnpm install
