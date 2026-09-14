from pathlib import Path
import re

p=Path('index.html')
h=p.read_text(encoding='utf-8')
images={20:'day-20-viking-dispatch.jpg',19:'day-19-viking-dispatch.jpg',18:'day-18-viking-dispatch.png',17:'day-17-viking-dispatch.png',16:'day-16-dispatch.png',15:'day-15-dispatch.jpg',14:'day-14-dispatch.jpg',13:'day-13-dispatch.jpg',12:'day-12-dispatch.jpg',11:'3603CAC6-D075-49DC-A4AC-C0DA57129282.png',10:'day-10-dispatch.jpg',9:'day-9-dispatch.jpg',8:'day-8-dispatch.jpg',7:'day-7-dispatch.jpg',6:'viking-dispatch-day-6.png',5:'archive-prologue-day1-5.jpg',4:'archive-prologue-day1-5.jpg',3:'archive-prologue-day1-5.jpg',2:'archive-prologue-day1-5.jpg',1:'archive-prologue-day1-5.jpg'}
for day,image in images.items():
    if not Path(image).exists(): raise SystemExit(f'Missing approved archive artwork: {image}')
    pattern=re.compile(rf'(<a class="archive-day" href="archive/day-{day}\.html">.*?<div class="archive-day-image"><img src=")[^"]+(" alt="Day {day} voyage archive")',re.S)
    h,n=pattern.subn(rf'\g<1>{image}\g<2>',h,count=1)
    if n!=1: raise SystemExit(f'Could not safely update Voyage Archive artwork for Day {day}')
p.write_text(h,encoding='utf-8')
