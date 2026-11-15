"""Bundle the tested demo site and exact tracked source for a GitHub release."""
import hashlib
import json
from pathlib import Path
import subprocess
import zipfile

root = Path(__file__).resolve().parents[1]
version = json.loads((root / 'package.json').read_text())['version']
revision = subprocess.check_output(['git', 'rev-parse', 'HEAD'], cwd=root, text=True).strip()
origin = 'https://teatime-starter.netlify.app'
assert origin in (root / 'public/robots.txt').read_text(), 'Build the real demo origin before bundling'
output = root / '.cache/release'
output.mkdir(parents=True, exist_ok=True)
site = output / f'teatime-starter-{version}-site.zip'
source = output / f'teatime-starter-{version}-source.zip'
site_files = sorted(file for file in (root / 'public').rglob('*') if file.is_file())
with zipfile.ZipFile(site, 'w', compression=zipfile.ZIP_DEFLATED, compresslevel=9) as archive:
    for file in site_files:
        assert not file.is_symlink()
        archive.write(file, file.relative_to(root / 'public').as_posix())
tracked = subprocess.check_output(['git', 'ls-tree', '-r', '-z', revision], cwd=root).decode().split('\0')
with zipfile.ZipFile(source, 'w', compression=zipfile.ZIP_DEFLATED, compresslevel=9) as archive:
    for entry in filter(None, tracked):
        metadata, name = entry.split('\t', 1)
        mode, kind, blob = metadata.split()
        assert mode in ('100644', '100755') and kind == 'blob', name
        content = subprocess.check_output(['git', 'cat-file', 'blob', blob], cwd=root)
        archive.writestr(f'teatime-starter-{version}/{name}', content)
hashes = {file.name: hashlib.sha256(file.read_bytes()).hexdigest() for file in (site, source)}
receipt = output / 'BUILD.json'
receipt.write_text(json.dumps({'version': version, 'revision': revision, 'siteOrigin': origin,
    'nodeVersion': subprocess.check_output(['node', '--version'], text=True).strip(),
    'siteFiles': len(site_files), 'sha256': hashes}, indent=2) + '\n')
downloads = (site, source, receipt)
(output / 'SHA256SUMS.txt').write_text(''.join(f'{hashlib.sha256(file.read_bytes()).hexdigest()}  {file.name}\n' for file in downloads))
for file in downloads:
    print(file)
