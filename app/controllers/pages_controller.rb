class PagesController < ApplicationController
  
  def home
  	@page = params[:page].blank? ? 1 : params[:page].to_i    
    @browse_node_id = params[:bn].blank? ? ROOT_BROWSE_NODE_ID : params[:bn]
    res = Amazon::Ecs.item_search(
      @browse_node_id, 
      { :type => 'BrowseNode', 
        :country => 'jp', 
        :response_group => 'Medium',
        # :sort => 'daterank',
        :item_page => @page })
    @items = res.items
  end
  
end