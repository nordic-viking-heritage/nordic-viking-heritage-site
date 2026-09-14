from pathlib import Path

path = Path("index.html")
html = path.read_text(encoding="utf-8")

start_marker = '<section class="dark-section" id="our-saga-day-20">'
next_marker = '<section class="ship-roll" id="ship-roll">'

if html.count(start_marker) != 1:
    raise SystemExit(f"Expected exactly one Day 20 Our Saga section, found {html.count(start_marker)}")
if html.count('id="our-saga-day-21"') != 1:
    raise SystemExit("Day 21 Our Saga must exist exactly once before cleanup")

start = html.index(start_marker)
end = html.index(next_marker, start)
html = html[:start] + html[end:]

if 'id="our-saga-day-20"' in html:
    raise SystemExit("Day 20 Our Saga was not fully removed")
if html.count('id="our-saga-day-21"') != 1:
    raise SystemExit("Day 21 Our Saga changed unexpectedly")
if html.count('href="#our-saga-day-21"') < 1:
    raise SystemExit("Current Saga navigation no longer points to Day 21")

path.write_text(html, encoding="utf-8")
print("Removed Day 20 from the current Our Saga section; Day 21 remains current.")
