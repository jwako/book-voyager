collection @categories, :root => false, :object_root => false
node(:name) { |c| c["Name"] }
node(:node_id) { |c| c["BrowseNodeId"] }
node(:nodes) { [] }
