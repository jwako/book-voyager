collection @items => :items
node(:title) { |i| i.get('ItemAttributes/Title') }
node(:author) { |i| i.get('ItemAttributes/Author') }
node(:asin) { |i| i.get('ASIN') }
node(:image_url) { |i| i.get('MediumImage/URL') }
node(:url) { |i| i.get("DetailPageURL") }
