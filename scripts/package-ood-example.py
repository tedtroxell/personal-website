"""Package only reviewed source files; never include local training outputs."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
root = Path(__file__).resolve().parents[1]
source = root / 'examples/ood-observability'
output = root / 'public/downloads/ood-observability-pytorch.zip'
output.parent.mkdir(parents=True, exist_ok=True)
with ZipFile(output, 'w', ZIP_DEFLATED) as archive:
    for name in ('ood.py', 'demo.py', 'test_ood.py', 'requirements.txt', 'README.md'):
        archive.write(source / name, 'ood-observability/' + name)
print(output)
