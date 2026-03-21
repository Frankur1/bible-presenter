import xml.etree.ElementTree as ET
import json
import os

def convert_xml():
    input_file = 'ArmenianNEABible.xml'
    output_file = 'bible/ArmEastern_fixed.json'

    if not os.path.exists(input_file):
        print(f"Файл {input_file} не найден! Положи его рядом со скриптом.")
        return

    print("Начинаю обработку XML... это займет пару секунд.")
    tree = ET.parse(input_file)
    root = tree.getroot()

    fixed_bible = []

    # В твоем XML структура: bible -> book -> chapter -> verse
    for book in root.findall('.//book'):
        chapters_data = []
        
        # Сортируем главы по номеру
        chapters = sorted(book.findall('chapter'), key=lambda x: int(x.get('number')))
        
        for chapter in chapters:
            # Сортируем стихи по номеру и берем только текст
            verses = sorted(chapter.findall('verse'), key=lambda x: int(x.get('number')))
            verses_text = [v.text if v.text else "" for v in verses]
            chapters_data.append(verses_text)
            
        fixed_bible.append({
            "chapters": chapters_data
        })

    if not os.path.exists('bible'):
        os.makedirs('bible')

    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(fixed_bible, f, ensure_ascii=False)

    print(f"✅ Готово! Обработано книг: {len(fixed_bible)}")
    print(f"Файл сохранен: {output_file}")

if __name__ == "__main__":
    convert_xml()