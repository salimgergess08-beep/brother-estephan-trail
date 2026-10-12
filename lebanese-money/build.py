"""Build a dependency-free static site and cache source images when reachable."""
from pathlib import Path
import json, shutil, urllib.request, concurrent.futures

root = Path(__file__).resolve().parent
out = root / 'dist'
out.mkdir(exist_ok=True)
(out / 'assets').mkdir(exist_ok=True)
base = 'https://www.bdl.gov.lb/'
notes = base + 'CB%20Com/Banknotes%20%26%20Coins/Lebanese%20BankNotes/Banknotes/'
urls = ['https://upload.wikimedia.org/wikipedia/commons/e/e7/25-Livres-Lebanon-1974.jpg', 'https://upload.wikimedia.org/wikipedia/commons/9/92/50-Livres-Lebanon-1974.jpg', 'https://www.bdl.gov.lb/CB%20Com/Banknotes%20%26%20Coins/Lebanese%20BankNotes/Banknotes/1000LBP_B_2008_R.jpg', 'https://en.numista.com/catalogue/photos/liban/6450aa5c5969b8.92074696-original.jpg', 'https://en.numista.com/catalogue/photos/liban/644fffd884dfd3.00089957-original.jpg', 'https://en.numista.com/catalogue/photos/liban/6450abf054b461.43796961-original.jpg', 'https://en.numista.com/catalogue/photos/liban/64500787b88560.10183199-original.jpg', 'https://en.numista.com/catalogue/photos/liban/65a6c628bec293.56046840-original.jpg']
def download(pair):
 i, url = pair
 bundled = root / 'images' / f'note-{i}.jpg'
 if bundled.exists():
  name = f'assets/note-{i}.jpg'
  shutil.copyfile(bundled, out / name)
  print('Bundled', name)
  return url, name
 try:
  req = urllib.request.Request(url, headers={'User-Agent':'LiraDiariesEducationalProject/1.0'})
  with urllib.request.urlopen(req, timeout=18) as response:
   content = response.read()
  if not content.startswith(b'\xff\xd8'):
   raise ValueError('Response is not a JPEG')
  name = f'assets/note-{i}.jpg'
  (out / name).write_bytes(content)
  print('Cached', name)
  return url, name
 except Exception as error:
  print('Using source-hosted image:', i, type(error).__name__)
  return None
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
 mapping = dict(result for result in pool.map(download, enumerate(urls)) if result)
for name in ['index.html','styles.css','script.js']:
 shutil.copyfile(root / name, out / name)
html = (out / 'index.html').read_text()
html = html.replace('<script defer src="script.js"></script>', '<script src="assets.js"></script><script defer src="script.js"></script>')
for url, local in mapping.items():
 html = html.replace(url, local)
(out / 'index.html').write_text(html)
(out / 'assets.js').write_text('window.LOCAL_ASSETS=' + json.dumps(mapping) + ';')
print(f'Build complete: {len(mapping)}/{len(urls)} images cached; remaining images use their original source URLs.')
