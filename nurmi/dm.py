import xml.etree.ElementTree as ET
import re

def restructure_xml(input_file, output_file):
    # Parse the XML file
    tree = ET.parse(input_file)
    root = tree.getroot()

    # Create a new root element
    new_root = ET.Element('products')

    for product in root.findall('product'):
        new_product = ET.SubElement(new_root, 'product')

        # List of tags to be kept separate
        separate_tags = ['name', 'price', 'stock', 'stockcode', 'category', 'brand', 'type', 
                         'product_url', 'image_url', 'url', 'imageURL', 'productURL']

        # Extract and add specified tags
        for tag in separate_tags:
            element = product.find(f'.//{tag}')
            if element is not None and element.text:
                ET.SubElement(new_product, tag).text = element.text.strip()

        # Handle technical_specifications (rename to details and convert to text)
        tech_specs = product.find('technical_specifications')
        details = []
        if tech_specs is not None:
            for element in tech_specs:
                if element.text and element.text.strip():
                    details.append(f"{element.tag}: {element.text.strip()}")
        
        # Gather additional details from other tags
        for element in product.iter():
            if element.tag not in separate_tags + ['product', 'technical_specifications']:
                if element.text and element.text.strip():
                    details.append(f"{element.tag}: {element.text.strip()}")
        
        if details:
            # Remove any product_url from details
            details = [detail for detail in details if not detail.startswith('product_url:')]
            ET.SubElement(new_product, 'details').text = ', '.join(details)

    # Write the new XML structure to the output file
    new_tree = ET.ElementTree(new_root)
    new_tree.write(output_file, encoding='utf-8', xml_declaration=True)

# File paths
input_file = r'C:\Users\satog\OneDrive\Desktop\updated_database.xml'
output_file = r'C:\Users\satog\OneDrive\Desktop\restructured_products.xml'

# Restructure the XML file
restructure_xml(input_file, output_file)

print(f"XML has been restructured. The result is saved in: {output_file}")