
import sqlite3
import json

old_db_path = r'c:\Users\迪迦\AppData\Roaming\Trae CN\User\workspaceStorage\a250579cf3e2a2bfb0f30d87d9193b74\state.vscdb'
new_db_path = r'c:\Users\迪迦\AppData\Roaming\Trae CN\User\workspaceStorage\45d9b69a8aec76d0ec99f5f72101a364\state.vscdb'

print("=== 迁移对话历史 ===")
print(f"源数据库: {old_db_path}")
print(f"目标数据库: {new_db_path}\n")

old_conn = sqlite3.connect(old_db_path)
old_cursor = old_conn.cursor()

old_cursor.execute("SELECT key, value FROM ItemTable WHERE key LIKE '%ai-chat%' OR key LIKE '%ai-agent%' OR key = 'ChatStore'")
chat_data = old_cursor.fetchall()

print(f"找到 {len(chat_data)} 条聊天相关记录:")
for key, value in chat_data:
    print(f"  - {key}")

old_conn.close()

new_conn = sqlite3.connect(new_db_path)
new_cursor = new_conn.cursor()

for key, value in chat_data:
    new_cursor.execute("REPLACE INTO ItemTable (key, value) VALUES (?, ?)", (key, value))
    print(f"  ✓ 已迁移: {key}")

new_conn.commit()
new_conn.close()

print("\n✓ 迁移完成！请重启 Trae IDE 查看对话历史。")
