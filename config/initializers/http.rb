require 'net/http'

class Net::HTTP
  alias :create :initialize

  def initialize(*args)
    logger = Rails.logger
    def logger.<< log
      info "HTTP_LOG:#{log}"
    end
    create(*args)
    self.set_debug_output logger
  end
end