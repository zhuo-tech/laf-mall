cd ../common/
yarn build

cd ../server/
Remove-Item -Force -Recurse .\node_modules\common\

pnpm install
