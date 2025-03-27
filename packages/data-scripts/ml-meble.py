import os
import json
from pdf2image import convert_from_path
from PIL import Image
import random

os.environ['PATH'] += os.pathsep + '/opt/homebrew/bin'

def resize(image, base_width = 1000):
  if image.size[0] < base_width:
    return image
  w_percent = (base_width / float(image.size[0]))
  h_size = int((float(image.size[1]) * float(w_percent)))
  return image.resize((base_width, h_size))

base_path = './ml-meble/01. KOLEKCJE'
products_dir = 'prod'
tech_draw_dir = '02. RYSUNKI TECHNICZNE/rys'
manual_path = '03. INSTRUKCJE'
galery_dir = '01. GALERIA'
arrangements_dir  = 'aran'

collections = [d for d in os.listdir(base_path) if not d.startswith('.')]
num_collections = len(collections)

products = []
for j, collection in enumerate(collections):
  print(f'##### Processing collection {j+1}/{num_collections}: {collection} #####')
  products_in_collection = [d for d in os.listdir(f'{base_path}/{collection}/{tech_draw_dir}') if not d.startswith('.')]

  for product_name in products_in_collection:
    id = product_name.split('.')[0][3:]
    print(f'Processing product: {id}')
    name = id.replace('_', ' ')
    product = {
      'id': id,
      'name': name,
      'collection': collection,
      'company': 'ML Meble',
      'category': 'meble',
      'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porttitor, nisl rutrum sollicitudin rutrum, ligula enim feugiat tortor, malesuada sollicitudin nunc augue et orci. Maecenas lectus mi, mattis in bibendum vitae, volutpat at enim.',
    }
    
    # add link to manual
    manual_file_path = f'{base_path}/{collection}/{manual_path}/' + os.listdir(f'{base_path}/{collection}/{manual_path}')[0]
    if os.path.isfile(manual_file_path):
        with open(manual_file_path, 'r') as manual_file:
          product['manual_url'] = json.load(manual_file)['url']
    else:
        product['manual_url'] = ''
    
    # convert technical drawing from pdf to jpg
    destination_dir = f'./processed_data/ml_meble/{collection}/{id}'
    os.makedirs(destination_dir, exist_ok=True)
    tech_draw = convert_from_path(f'{base_path}/{collection}/{tech_draw_dir}/{product_name}')
    tech_draw = resize(tech_draw[0])
    tech_draw.save(f'{destination_dir}/tech_draw.jpg', 'JPEG')
    product['img_urls'] = [f'ml_meble/{collection}/{id}/tech_draw.jpg']

    # copy products images
    products_images = os.listdir(f'{base_path}/{collection}/{galery_dir}/{products_dir}')
    filtered_images = [s for s in products_images if id.lower() in s.lower()]
    for i, gallery_image in enumerate(filtered_images):
      if i == 0:
        product['main_img_url'] = f'ml_meble/{collection}/{id}/img_{i+1}.jpg'
      else:
        product['img_urls'].insert(0, f'ml_meble/{collection}/{id}/img_{i+1}.jpg')

      src_path = f'{base_path}/{collection}/{galery_dir}/{products_dir}/{gallery_image}'
      if not os.path.isfile(src_path):
        continue

      with open(src_path, 'rb') as src_file:
        with Image.open(src_file) as img:              
            img = resize(img)
            with open(f'{destination_dir}/img_{i+1}.jpg', 'wb') as dst_file:
                img.save(dst_file, 'JPEG')
    
    # copy arrangement images
    aran_images = os.listdir(f'{base_path}/{collection}/{galery_dir}/{arrangements_dir}')
    filtered_images = [s for s in aran_images if collection.lower() in s.lower()]
    random_aran_image = random.choice(aran_images)
    src_path = f'{base_path}/{collection}/{galery_dir}/{arrangements_dir}/{random_aran_image}'
    if os.path.isfile(src_path):
      with open(src_path, 'rb') as src_file:
        with Image.open(src_file) as img:              
          img = resize(img)
          with open(f'processed_data/ml_meble/{collection}/arrangement.jpg', 'wb') as dst_file:
            img.save(dst_file, 'JPEG')
    product['img_urls'].append(f'ml_meble/{collection}/arrangement.jpg')
    
    products.append(product)
    
with open('products.json', 'w') as json_file:
  json.dump(products, json_file, ensure_ascii=False, indent=4)

