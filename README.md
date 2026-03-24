# アクセス URL はこちら：                                                                                                                                    
  - 顧客追加: http://dev.marathon.rplearn.net/momoka_yamazaki/customer/add.html
  - 顧客一覧: http://dev.marathon.rplearn.net/momoka_yamazaki/customer/list.html                                                                             
                  
  ---                                                                                                                                                        
# パスまとめ：
                                                                                                                                                             
  ## ステージングサーバー
                                                                                                                                                             
  ### ファイルパス                                                                                                                                           
  - フロントエンド: /usr/share/nginx/html/momoka_yamazaki/
  - バックエンド:   /app/momoka_yamazaki/src/node/                                                                                                           
                                                                                                                                                             
  ### デプロイ手順
  1. ローカルで zip 圧縮                                                                                                                                     
     zip -r src.zip src                                                                                                                                      
   
  2. サーバーにアップロード                                                                                                                                  
     scp src.zip momoka_yamazaki@dev.marathon.rplearn.net:/app/momoka_yamazaki/
                                                                                                                                                             
  3. サーバーで解凍・コピー
     cd /app/momoka_yamazaki && unzip -o src.zip                                                                                                             
     cp -r src/web/* /usr/share/nginx/html/momoka_yamazaki/                                                                                                  
   
  4. config.js を手動修正（デプロイのたびに必要）                                                                                                            
     vi /usr/share/nginx/html/momoka_yamazaki/config.js
     → apiUrl: "/api_momoka_yamazaki" に変更                                                                                                                 
                                                                                                                                                             
  5. Node サーバー起動
     cd /app/momoka_yamazaki/src/node && npm run dev                                                                                                         
                  
  ### 確認 URL                                                                                                                                               
  - 顧客追加: http://dev.marathon.rplearn.net/momoka_yamazaki/customer/add.html
  - 顧客一覧: http://dev.marathon.rplearn.net/momoka_yamazaki/customer/list.html 
