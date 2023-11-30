//INCLUI BIBLIOTECAS
#include <stdio.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "driver/gpio.h"
#include "sdkconfig.h"
#include <Stepper.h> 
#include <WiFi.h>
#include <HTTPClient.h>
#include <WiFiManager.h> 

//DEFINE OS PINOS
#define echoPin 15
#define trigPin 5

//DEFINE VERIVEIS DE SOM
#define VELOCIDADE_DO_SOM 0.034

const int stepsPerRevolution = 50;
Stepper myStepper(stepsPerRevolution, 13,14,4,25);

//INICIA OS PINOS DE ENTRADA E SAIDA
void initPins() {
  Serial.begin(115200);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

TaskHandle_t taskGetBotao = NULL;

bool getDistancia() {
  long duracao;
  float distancCm = 100;

  digitalWrite(trigPin, LOW);
  vTaskDelay(2); 
  digitalWrite(trigPin, HIGH);
  vTaskDelay(10); // LIGA O PINO DE TRIGER
  digitalWrite(trigPin, LOW);  // LE O PINO DE RETORNO DA ONDA
  duracao = pulseIn(echoPin, HIGH);  // CALCULA A DISTANCIA
  distancCm = duracao * VELOCIDADE_DO_SOM / 2;  // CONVERTE A DISTANCIA PARA CM
  Serial.print("Distancia (cm): ");  // PRINTA A DISTANCIA
  Serial.println(distancCm);
  if (distancCm < 7 || distancCm > 12) {  //VERIFICA A DISTANCIA
    return 1; //RETORNA SE O PRODUTO PASSOU
  }else{
    return 0; 
  }
}

void ligaEsteira() {
  bool validacao = 0;
  while (validacao == 0){
          myStepper.step(stepsPerRevolution); //LIGA A ESTEIRA
          validacao = getDistancia(); //VERIFICA SE O PRODUTO PASSOU
  }
}

void getBotao(void *arg) {
  while (1) {
    if ((WiFi.status() == WL_CONNECTED)) { //VERIFICA SE ESTA CONECTADO NO WIFI
      HTTPClient http;
      http.begin("https://iot-abp-api-production.up.railway.app/shoppings/654d62afe2d4afe055a66c2c"); //URL DE CONSULTA
      int httpCode = http.GET();                                        //FAZ A REQUISICAO HTTP
      if (httpCode > 0) { //VERIFICA SE TEVE RESPOSTA
        String payload = http.getString(); 
        Serial.println(httpCode); //PRINTA COGIDO DE RESPOSTA
        Serial.println(payload); //PRINTA A RESPOSTA
        if (payload == "{\"response\":true}"){ //VALIDA SE RESPOSTA FOI VERDADEIRA OU FALSA
          Serial.println("Venda encontrada"); // PRINTA SE ENCONTROU VENDA
          ligaEsteira();  // INICIA A ESTEIRA
        }else if (payload == "{\"response\":false}"){
          Serial.println("Sem Vendas"); // PRINTA QUE NAO TEVE VENDA
        }  
      }
      else {
        Serial.println("Error on HTTP request"); // SE NAO TIVER RESPOSTA DA ERRO
      }
    http.end(); //FINALIZA A REQUISICAO HTTP
    }
  }
}

void initwifi() { // CONECTA O WIFI
  Serial.begin(115200);
  WiFiManager wm;  //INICIA O WIFI MANEGER
  bool res;
  res = wm.autoConnect("EsteiraA","12344321"); //CRIA A REDE DE CONFIGURACAO COM SSID E SENHA

  if(!res) {  //VERIFICA SE CONECTOU NA REDE
    Serial.println("Failed to connect");
  } else {    
    Serial.println("connected...yeey :)");
  }
}

void initTasks() {
  xTaskCreatePinnedToCore(getBotao, "getBotao", 4096, NULL, 10, &taskGetBotao, 0); //INICIA A TASK DE REQUISICAO HTTP
}

void setup() { 
  myStepper.setSpeed(500);
  initPins(); //INICIA OS PINOS
  initwifi(); //INICIA O WIFI
  initTasks(); //INICIA AS TASK
}

void loop() {}