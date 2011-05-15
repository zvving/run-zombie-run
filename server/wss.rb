require 'rubygems'
require 'eventmachine'
require 'em-websocket'
# settings


puts "try start EM..."
EM.run do
  @channel_v = EM::Channel.new

  
  puts "try start view web socket server..."
  EventMachine::WebSocket.start(
    :host => "huihui", :port => 3101, :debug => true) do |ws|
    
    sid = nil
    
    ws.onopen {
      
      ws.onmessage { |msg|

        case msg
        when "sysSubViewer"
          # 验证成功,交换信息
          sid = @channel_v.subscribe { |msg| ws.send msg }
        else
          @channel_v.push msg
        end
        puts "v receive: #{msg}"
      }

      ws.onclose {
        @channel_v.unsubscribe(sid) if sid != nil
        puts "v WebSocket closed:#{sid}"
      }
      
      ws.onerror { |e|
        puts "v Error: #{e.message}"
      }
    }
    
  end
  puts "view web socket server started."
  
  puts "try start controller web socket server..."
  EventMachine::WebSocket.start(
    :host => "huihui", :port => 3102, :debug => true) do |ws|
    
    sid = nil
    
    ws.onopen {
      
      ws.onmessage { |msg|

        case msg
        when "sysSubController"
          @selfChannel = @channel_v;
        else
          @selfChannel.push msg if @selfChannel != nil
        end
        puts "c receive: #{msg}"
      }

      ws.onclose {
        @channel_v.unsubscribe(sid) if sid != nil
        puts "c WebSocket closed:#{sid}"
      }
      
      ws.onerror { |e|
        puts "c Error: #{e.message}"
      }
    }

    
    
  end
  puts "controller web socket server started."
  
  puts "EM started."
end
puts "EM END!"



