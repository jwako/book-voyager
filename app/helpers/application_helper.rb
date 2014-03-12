module ApplicationHelper
  def title(value)
    unless value.nil?
      @title = "#{value} | BookVoyager"      
    end
  end
end
