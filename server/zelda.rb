require 'rubygems'
require 'eventmachine'
require 'em-websocket'

require  'socket' 

hostIp = IPSocket.getaddress(Socket.gethostname)

puts "try start EM on:[#{hostIp}]..."


EM.run do
  @channel_f = EM::Channel.new
  @channel_chat = EM::Channel.new
  
  
  # flying zombie web socket 服务器======================
  puts "try start view web socket server..."
  EventMachine::WebSocket.start(
    :host => hostIp, :port => 3101, :debug => true) do |ws|
    
    ws.onopen {
      
      f_sid = nil
      chat_sid = nil
      
      ws.onmessage { |msg|
        receiverKey = msg[0,1];
        receiverContent = msg[1..-1]
        
        puts "f ws receive: #{receiverKey} + #{receiverContent}"
        
        case receiverKey
        when "f"
        when "w"
        when "z"
          case receiverContent
          when "likFlyInit"
            # 验证成功,交换信息
            f_sid = @channel_f.subscribe { |msg| ws.send msg }
            chat_sid = @channel_chat.subscribe { |msg| ws.send msg }
            puts "===flying zombie inited."
          else
            puts "===onmessage error:#{mgs}"
          end
        else
          @channel_f.push msg
        end
        
      }

      ws.onclose {
        @channel_f.unsubscribe(f_sid) if f_sid != nil
        @channel_chat.unsubscribe(chat_sid) if chat_sid != nil
        puts "flying zombie WebSocket closed:#{f_sid}"
      }
      
      ws.onerror { |e|
        puts "flying zombie Error: #{e.message}"
      }
      
      
      ws.send "likConnectOk"
    }
    
  end
  puts "view web socket server started."
  # flying zombie web socket 服务器 end===================
  
  # wind web socket 服务器======================
  puts "try start controller web socket server..."
  EventMachine::WebSocket.start(
    :host => hostIp, :port => 3102, :debug => true) do |ws|
    
    chat_sid = nil
    
    ws.onopen {
      
      ws.onmessage { |msg|

        case msg
        when "sysSubController"
          @selfChannel_v = @channel_f
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
  # wind web socket 服务器======================
  
  
  puts "EM started."
end
puts "EM END!"



