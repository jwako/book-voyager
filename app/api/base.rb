module Base
	class API < Grape::API
		version 'v1', using: :path
		format :json

		mount AmazonClient::API
	end
end