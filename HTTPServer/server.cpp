#include <sys/socket.h>
#include <netinet/in.h>
#include <string>
#include <unistd.h>

#define PORT 8080

int main()
{
  int server_fd, new_socket; long valread;
  sockaddr_in address;
  int addrlen = sizeof(address);

  // std::string hello = "Hello from server";
  std::string hello = "HTTP/1.1 200 OK\nContent-Type: text/plain\nContent-Length: 12\n\nHello world!";


  // Creating socket
  if ((server_fd = socket(AF_INET, SOCK_STREAM, 0 )) == 0)
  {
    printf("Error in socket");
    return -1;
  }

  address.sin_family = AF_INET;
  address.sin_addr.s_addr = INADDR_ANY;
  address.sin_port = htons( PORT );

  memset(address.sin_zero, '\0', sizeof(address.sin_zero));

  if (bind(server_fd, (sockaddr *)&address, sizeof(address)) < 0)
  {
    printf("Error in bind");
    return -1;
  }

  if (listen(server_fd, 10) < 0)
  {
    printf("Error in listen");
    return -1;
  }

  while(1)
  {
    printf("\n++++++ Waiting for new connection ++++++\n\n");
    if ((new_socket = accept(server_fd, (sockaddr *)&address, (socklen_t *)&addrlen)) < 0)
    {
      printf("Error in accept");
      return -1;
    }

    char buffer[30000] = {0};
    valread = read( new_socket, buffer, 30000);
    printf("%s\n", buffer);
    write(new_socket, hello.c_str(), hello.length());
    printf("------ Hello message sent ------ \n");
    close(new_socket);
  }
}
