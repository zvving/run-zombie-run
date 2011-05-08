require 'rubygems'
require 'eventmachine'
require 'em-websocket'
# settings

EM.run do
  @channel_v = EM::Channel.new

  
  EventMachine::WebSocket.start(
    :host => "0.0.0.0", :port => 3005, :debug => true) do |ws|
    
    sid = nil
    
    ws.onopen {
      
      ws.onmessage { |msg|

        case msg
        when "controller"
          @channel_v.push "controller:#{sid} connect..."
        when "viewer"
          sid = @channel_v.subscribe { |msg| ws.send msg }
        else
          @channel_v.push msg
        end
        puts "receive: #{msg}"
      }

      ws.onclose {
        @channel_v.unsubscribe(sid) if sid != nil
        puts "WebSocket closed:#{sid}"
      }
      
      ws.onerror { |e|
        puts "Error: #{e.message}"
      }
    }

    
    
  end
   
end



