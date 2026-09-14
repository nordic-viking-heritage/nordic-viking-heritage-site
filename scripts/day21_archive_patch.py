from pathlib import Path

p=Path('index.html')
h=p.read_text(encoding='utf-8')
fig='<figure><img class="zoomable" src="day-21-crew-honors.jpg" alt="Day 21 Crew Honors"><figcaption>DAY 21 · AUÐUN · EINAR · RAGNA</figcaption></figure>'
opener='<div class="crew-honors-archive-grid">'
if fig not in h:
    if opener not in h: raise SystemExit('Crew Honors archive grid missing')
    h=h.replace(opener,opener+fig,1)
p.write_text(h,encoding='utf-8')

v=Path('scripts/validate_site_structure.py')
s=v.read_text(encoding='utf-8')
s=s.replace('for day in range(1, 21):','for day in range(1, 22):',1)
if "21: 'day-21-viking-dispatch.jpg'" not in s:
    s=s.replace("approved_archive_images = {\n    20:","approved_archive_images = {\n    21: 'day-21-viking-dispatch.jpg',\n    20:",1)
v.write_text(s,encoding='utf-8')
