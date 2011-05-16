require 'rubygems'
require 'eventmachine'
require 'em-websocket'
# settings

hostIp = "192.168.1.131"

puts "try start EM..."
EM.run do
  @channel_v = EM::Channel.new
  @channel_chat = EM::Channel.new

  
  puts "try start view web socket server..."
  EventMachine::WebSocket.start(
    :host => hostIp, :port => 3101, :debug => true) do |ws|
    
    v_sid = nil
    chat_sid = nil
    
    ws.onopen {
      
      ws.onmessage { |msg|

        case msg
        when "sysSubViewer"
          # 验证成功,交换信息
          v_sid = @channel_v.subscribe { |msg| ws.send msg }
          chat_sid = @channel_chat.subscribe { |msg| ws.send msg }
        else
          @channel_v.push msg
        end
        puts "v receive: #{msg}"
      }

      ws.onclose {
        @channel_v.unsubscribe(v_sid) if v_sid != nil
        @channel_chat.unsubscribe(chat_sid) if chat_sid != nil
        puts "v WebSocket closed:#{v_sid}"
      }
      
      ws.onerror { |e|
        puts "v Error: #{e.message}"
      }
    }
    
  end
  puts "view web socket server started."
  
  puts "try start controller web socket server..."
  EventMachine::WebSocket.start(
    :host => hostIp, :port => 3102, :debug => true) do |ws|
    
    chat_sid = nil
    
    ws.onopen {
      
      ws.onmessage { |msg|

        case msg
        when "sysSubController"
          @selfChannel_v = @channel_v
          @selfChannel_chat = @channel_chat
          chat_sid = @channel_chat.subscribe { |msg| ws.send msg }
        else
          case msg[1,3]
          when "msg"
            @selfChannel_chat.push msg if @selfChannel_chat != nil
          else
            @selfChannel_v.push msg if @selfChannel_v != nil
          end
        end
        puts "c receive: #{msg}"
      }

      ws.onclose {
        @selfChannel_v = nil
        @selfChannel_chat = nil
        @channel_chat.unsubscribe(chat_sid) if chat_sid != nil
        puts "c WebSocket closed:#{chat_sid}"
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



