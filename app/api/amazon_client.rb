module AmazonClient
	class API < Grape::API
		formatter :json, Grape::Formatter::Rabl

		desc "Returns books based on browse node id from Amazon"
		get '/books/:id', :rabl => "item" do
			@browse_node_id = params[:bn].blank? ? ROOT_BROWSE_NODE_ID : params[:bn]
		  res = Amazon::Ecs.item_search(
		    @browse_node_id,
		    { 
		    	:type => 'BrowseNode', 
		      :country => 'jp',
		      :response_group => 'Medium',
		      :sort => 'daterank',
		      :item_page => params[:id]
		    }
		  )
		  @items = res.items
		end

	end
end
