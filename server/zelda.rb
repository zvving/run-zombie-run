require 'rubygems'
require 'eventmachine'
require 'em-websocket'

# require  'socket' 

hostIp = IPSocket.getaddress(Socket.gethostname)

puts "try start EM on:[#{hostIp}]..."


EM.run do

  @channel_chat = EM::Channel.new
  
  
  # flying zombie web socket 服务器======================
  puts "try start view web socket server..."
  EventMachine::WebSocket.start(
    :host => hostIp, :port => 3101, :debug => false) do |ws|
    
    ws.onopen {
      
      @fly = nil
      chat_sid = nil
      
      ws.onmessage { |msg|
        receiverKey = msg[0,1];
        receiverContent = msg[1..-1]
        
        puts "fly ws receive: #{receiverKey} + #{receiverContent}"
        
        case receiverKey
        when "f"
        when "w"
        when "z"
          case receiverContent
          when "likFlyInit"
            # 验证成功,交换信息
            @fly = ws
            chat_sid = @channel_chat.subscribe { |msg| ws.send msg }
            puts "===flying zombie inited."
          else
            puts "===onmessage in z error:#{msg}"
          end
        else
          puts "===onmessage all error:#{msg}"
        end
        
      }

      ws.onclose {
        @fly=nil
        @channel_chat.unsubscribe(chat_sid) if chat_sid != nil
        puts "flying zombie WebSocket closed!"
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
    :host => hostIp, :port => 3102, :debug => false) do |ws|
    
    ws.onopen {
      
      @wind = nil
      chat_sid = nil
      
      ws.onmessage { |msg|
        receiverKey = msg[0,1];
        receiverContent = msg[1..-1]
        
        puts "wind ws receive: #{receiverKey} + #{receiverContent}"
        
        case receiverKey
        when "f"
          @fly.send receiverContent if @fly!= nil
        when "w"
        when "z"
          case receiverContent
          when "likWidInit"
            # 验证成功,交换信息
            @wind = ws
            chat_sid = @channel_chat.subscribe { |msg| ws.send msg }
            puts "===wind inited."
            @wind.send "likInited"
          else
            puts "===onmessage in z error:#{msg}"
          end
        else
          puts "===onmessage all error:#{msg}"
        end
        
      }

      ws.onclose {
        @fly.send "likWindLeave" if @fly != nil
        @wind=nil
        @channel_chat.unsubscribe(chat_sid) if chat_sid != nil
        puts "wind WebSocket closed!"
      }
      
      ws.onerror { |e|
        puts "wind Error: #{e.message}"
      }
      
      
      ws.send "likConnectOk"
    }
    
  end
  puts "controller web socket server started."
  # wind web socket 服务器======================
  
  
  puts "EM started."
end
puts "EM END!"



