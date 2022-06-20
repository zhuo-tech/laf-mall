cd ../common/
yarn build

cd ../admin/
Remove-Item -Force -Recurse .\node_modules\common\

pnpm install
