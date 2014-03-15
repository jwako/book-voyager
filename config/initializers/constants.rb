unless ENV["AWS_SECRET_KEY"].nil?
  Amazon::Ecs.options = {
    :associate_tag => 'kindlemania02-20',
    :AWS_access_key_id => ENV["AWS_ACCESS_KEY"],
    :AWS_secret_key => ENV["AWS_SECRET_KEY"]
  }
end
  
# ROOT_BROWSE_NODE_ID = 2275256051
# ROOT_STORE = 'KindleStore'
ROOT_BROWSE_NODE_ID = 465610
ROOT_STORE = 'Books'

PRICE = {
	"0" => [0, 250],
	"1" => [251, 500],
	"2" => [501,1000],
	"3" => [1001,1500],
	"4" => [1501,3000],
	"5" => [3001,5000],
	"6" => [5001,100000]
}
