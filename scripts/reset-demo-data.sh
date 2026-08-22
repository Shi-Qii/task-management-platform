#!/bin/bash
# [AI assisted - backend.md #7]
# 重置示範資料：清空 tasks 資料表，重新塞入 8 筆固定的示範任務（3 完成/5 待辦）。
# 使用前確認後端已經在 http://localhost:8080 跑起來。

set -e

BASE_URL="${BASE_URL:-http://localhost:8080}"

echo "清空現有任務..."
ids=$(curl -s "$BASE_URL/api/tasks" | python3 -c "import json,sys; print(' '.join(str(t['id']) for t in json.load(sys.stdin)))")
for id in $ids; do
  curl -s -o /dev/null -X DELETE "$BASE_URL/api/tasks/$id"
done

post() {
  curl -s -X POST "$BASE_URL/api/tasks" -H "Content-Type: application/json" -d "$1" \
    | python3 -c "import json,sys; print(json.load(sys.stdin)['id'])"
}
toggle() {
  curl -s -o /dev/null -X PATCH "$BASE_URL/api/tasks/$1/toggle"
}

echo "建立示範任務..."
id1=$(post '{"title":"設定 Supabase 資料庫","description":"建立專案並串接 Spring Boot"}')
id2=$(post '{"title":"完成後端 CRUD API","description":"Task 的新增、查詢、修改、刪除、切換完成狀態"}')
id3=$(post '{"title":"串接 OpenAPI 文件","description":"springdoc 自動產生規格供前端使用"}')
post '{"title":"前端任務列表頁","description":"用 Vuetify 做出任務列表與操作介面"}' > /dev/null
post '{"title":"前端新增/編輯表單","description":"Dialog 表單串接後端 API"}' > /dev/null
post '{"title":"撰寫 README","description":"說明如何啟動專案、OpenAPI 規格與領域模型位置"}' > /dev/null
post '{"title":"整理 AI 使用紀錄","description":"依前端/後端/資料庫分類記錄"}' > /dev/null
post '{"title":"準備面試 demo 流程","description":"畫面操作順序與技術重點講解"}' > /dev/null

toggle "$id1"
toggle "$id2"
toggle "$id3"

echo "完成，現在應該有 8 筆任務（3 完成/5 待辦）："
curl -s "$BASE_URL/api/tasks" | python3 -c "
import json, sys
tasks = json.load(sys.stdin)
print(len(tasks), 'tasks,', sum(1 for t in tasks if t['completed']), 'completed')
"
