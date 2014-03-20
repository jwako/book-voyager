collection @categories, :root => false, :object_root => false
node(:name) { |c| c["Name"] }
node(:node_id) { |c| c["BrowseNodeId"] }
node(:nodes) { [] }
node(:parent_node_id) { |c| c["ParentNodeId"] }
node(:root_node_id) { "" }
node(:show_flag) { false }