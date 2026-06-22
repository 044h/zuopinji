
import sqlite3
import json

db_path = r'c:\Users\迪迦\AppData\Roaming\Trae CN\User\workspaceStorage\a250579cf3e2a2bfb0f30d87d9193b74\state.vscdb'

conn = sqlite3.connect(db_path)
cursor = conn.cursor()

cursor.execute("SELECT value FROM ItemTable WHERE key = 'icube-ai-agent-storage-input-history'")
result = cursor.fetchone()

if result:
    value = result[0]
    try:
        data = json.loads(value)
        print("=== 完整对话历史 ===")
        print(f"总共有 {len(data)} 条对话记录\n")
        
        for i, item in enumerate(data, 1):
            print(f"[{i}] 用户: {item.get('inputText', 'N/A')}")
            if item.get('multiMedia'):
                print(f"   多媒体: {len(item['multiMedia'])} 个文件")
            print()
            
    except json.JSONDecodeError as e:
        print(f"JSON解析错误: {e}")
        print(f"原始数据长度: {len(value)}")
        print(f"原始数据前1000字符: {value[:1000]}")

conn.close()
