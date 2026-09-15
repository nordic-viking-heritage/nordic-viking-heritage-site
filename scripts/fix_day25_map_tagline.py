from pathlib import Path

path = Path("index.html")
text = path.read_text(encoding="utf-8")

old = '<p class="intro">The fleet remains at sea. Day 25 brings the voyage to <strong>46,318,030 steps</strong> — approximately <strong>30,106.7 km</strong> since Greenland. A storm now blocks the southern horizon.</p><div class="tags">'
new = '<p class="intro">The fleet remains at sea. Day 25 brings the voyage to <strong>46,318,030 steps</strong> — approximately <strong>30,106.7 km</strong> since Greenland. A storm now blocks the southern horizon.</p><p><strong>ONE FLEET. ONE SAGA. ONE GOAL. ROW ON. ⚔️</strong></p><div class="tags">'
trailing = '</figure><p><strong>ONE FLEET. ONE SAGA. ONE GOAL. ROW ON. ⚔️</strong></p></div></section>'
trailing_new = '</figure></div></section>'

if text.count(old) != 1:
    raise SystemExit(f"Expected exactly one Day 25 intro anchor, found {text.count(old)}")
if text.count(trailing) != 1:
    raise SystemExit(f"Expected exactly one trailing Day 25 tagline, found {text.count(trailing)}")

text = text.replace(old, new, 1)
text = text.replace(trailing, trailing_new, 1)
path.write_text(text, encoding="utf-8")
print("Moved Day 25 voyage-map tagline directly below the intro paragraph.")
