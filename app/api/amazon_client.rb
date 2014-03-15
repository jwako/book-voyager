module AmazonClient
	class API < Grape::API
		formatter :json, Grape::Formatter::Rabl

		desc "Returns books based on browse node id from Amazon"
		get '/books/:id', :rabl => "item" do
			@browse_node_id = params[:bn].blank? ? ROOT_BROWSE_NODE_ID : params[:bn]
		  res = Amazon::Ecs.item_search(
		    @browse_node_id,
		    { 
		    	:serach_index => 'Books',
		    	:type => 'BrowseNode', 
		      :country => 'jp',
		      :response_group => 'Medium',
		      :sort => 'salesrank',
		      :item_page => params[:id]
		    }
		  )
		  @items = res.items
		end

		desc "Returns categories from Amazon"
		get '/categories', :rabl => "category" do
			@browse_node_id = params[:bn].blank? ? ROOT_BROWSE_NODE_ID : params[:bn]
	    res = Amazon::Ecs.browse_node_lookup(
	    	@browse_node_id, 
	    	:response_group => 'BrowseNodeInfo', 
	    	:country => 'jp'
	    )
	    @categories = (res.doc/"Children/BrowseNode").collect { |item| Amazon::Element.new(item).get_hash }
	  end
	end
end
