
## Install & Dependence
- Nodejs
- Express
- Docker
- Kubernetes
- Skaffold


## Directory Hierarchy
```
|—— .gitignore
|—— auth
|    |—— .dockerignore
|    |—— .env
|    |—— Dockerfile
|    |—— jest.config.js
|    |—— package-lock.json
|    |—— package.json
|    |—— src
|        |—— app.ts
|        |—— controllers
|            |—— userController.ts
|        |—— entities
|            |—— User.ts
|        |—— grpc
|            |—— client.ts
|            |—— generated
|                |—— auth_grpc_pb.js
|                |—— auth_pb.js
|                |—— user_grpc_pb.js
|                |—— user_pb.js
|            |—— proto
|                |—— auth.proto
|            |—— server.ts
|        |—— helper.ts
|        |—— index.ts
|        |—— interactors
|            |—— userInteractor.ts
|        |—— interfaces
|            |—— IUserInteractor.ts
|            |—— IUserRepository.ts
|        |—— models
|            |—— userModel.ts
|        |—— repositories
|            |—— userRepository.ts
|        |—— routes
|            |—— __test__
|                |—— test.ts
|            |—— user.ts
|        |—— test
|            |—— setup.ts
|        |—— utils
|            |—— appCont.ts
|        |—— validators
|            |—— blockuserValidator.ts
|            |—— createUserValidator.ts
|            |—— loginValidator.ts
|    |—— tsconfig.json
|—— client
|    |—— .dockerignore
|    |—— .gitignore
|    |—— Dockerfile
|    |—— READ.md
|    |—— package-lock.json
|    |—— package.json
|    |—— public
|        |—— favicon.ico
|        |—— index.html
|        |—— manifest.json
|        |—— robots.txt
|    |—— src
|        |—— App.css
|        |—— App.js
|        |—— App.test.js
|        |—— assets
|            |—— images
|                |—— GoogleAnalyticsIconBlack.svg
|                |—— GoogleAnalyticsIconColored.svg
|                |—— GoogleAnalyticsIconGray.svg
|                |—— PearsonIcon.svg
|                |—— PearsonLogo.png
|                |—— PearsonLogomin.png
|        |—— components
|            |—— Alert.js
|            |—— DetailedLookupDialog.js
|            |—— EditDialog.js
|            |—— Header.js
|            |—— NoData.js
|            |—— PageLoader.js
|            |—— SideBar.js
|            |—— Table.js
|            |—— TextArea.js
|        |—— config
|            |—— .env
|            |—— environment.js
|        |—— index.css
|        |—— index.js
|        |—— logo.svg
|        |—— page
|            |—— Admin
|                |—— Admin.css
|                |—— Admin.js
|            |—— Summary
|                |—— Summary.css
|                |—— Summary.js
|            |—— Unauthorized
|                |—— Unauthorized.css
|                |—— Unauthorized.js
|        |—— redux
|            |—— adminRedux
|                |—— action.js
|                |—— reducer.js
|                |—— type.js
|            |—— cookieRedux
|                |—— action.js
|                |—— reducer.js
|                |—— type.js
|            |—— store.js
|            |—— summaryRedux
|                |—— action.js
|                |—— reducer.js
|                |—— type.js
|        |—— reportWebVitals.js
|        |—— service
|            |—— service.js
|        |—— setupTests.js
|—— common-modules
|    |—— .gitignore
|    |—— build
|        |—— broker-events
|            |—— base-events
|                |—— consumer.d.ts
|                |—— consumer.js
|                |—— producer.d.ts
|                |—— producer.js
|            |—— events.types.d.ts
|            |—— events.types.js
|            |—— topics.d.ts
|            |—— topics.js
|        |—— errors
|            |—— bad-request-error.d.ts
|            |—— bad-request-error.js
|            |—— custom-error.d.ts
|            |—— custom-error.js
|            |—— database-connection-error.d.ts
|            |—— database-connection-error.js
|            |—— not-authorized.d.ts
|            |—— not-authorized.js
|            |—— not-found-error.d.ts
|            |—— not-found-error.js
|            |—— request-validation-error.d.ts
|            |—— request-validation-error.js
|        |—— generated
|            |—— auth_grpc_pb.js
|            |—— auth_pb.js
|        |—— grpc-clients
|            |—— auth.client.d.ts
|            |—— auth.client.js
|        |—— index.d.ts
|        |—— index.js
|        |—— middlewares
|            |—— current-user.d.ts
|            |—— current-user.js
|            |—— error-handler.d.ts
|            |—— error-handler.js
|            |—— require-auth.d.ts
|            |—— require-auth.js
|            |—— validate-request.d.ts
|            |—— validate-request.js
|        |—— protos
|            |—— auth.proto
|        |—— types
|            |—— orderStatus.d.ts
|            |—— orderStatus.js
|    |—— package-lock.json
|    |—— package.json
|    |—— src
|        |—— broker-events
|            |—— base-events
|                |—— consumer.ts
|                |—— producer.ts
|            |—— events.types.ts
|            |—— topics.ts
|        |—— errors
|            |—— bad-request-error.ts
|            |—— custom-error.ts
|            |—— database-connection-error.ts
|            |—— not-authorized.ts
|            |—— not-found-error.ts
|            |—— request-validation-error.ts
|        |—— generated
|            |—— auth_grpc_pb.js
|            |—— auth_pb.js
|        |—— grpc-clients
|            |—— auth.client.ts
|        |—— index.ts
|        |—— middlewares
|            |—— current-user.ts
|            |—— error-handler.ts
|            |—— require-auth.ts
|            |—— validate-request.ts
|        |—— protos
|            |—— auth.proto
|        |—— types
|            |—— orderStatus.ts
|    |—— tsconfig.json
|—— infra
|    |—— k8s
|        |—— auth-depl.yml
|        |—— auth-mongo-depl.yml
|        |—— client-depl.yml
|        |—— ingress-svc.yml
|        |—— kafka-depl.yml
|        |—— kafka-nodeport-depl.yml
|        |—— kafka-storage.yml
|        |—— order-depl.yml
|        |—— orders-mongo-depl.yml
|        |—— payments-depl.yml
|        |—— payments-mongo-depl.yml
|        |—— products-depl.yml
|        |—— products-mongo-depl.yml
|        |—— zookeeper-depl.yml
|—— orders
|    |—— .dockerignore
|    |—— .env
|    |—— Dockerfile
|    |—— jest.config.js
|    |—— package-lock.json
|    |—— package.json
|    |—— src
|        |—— app.ts
|        |—— controllers
|            |—— orderController.ts
|        |—— entities
|            |—— Order.ts
|        |—— helper.ts
|        |—— index.ts
|        |—— interactors
|            |—— orderInteractor.ts
|        |—— interfaces
|            |—— IOrderInteractor.ts
|            |—— IOrderRepository.ts
|        |—— models
|            |—— orderModel.ts
|        |—— repositories
|            |—— orderRepository.ts
|        |—— routes
|            |—— __test__
|                |—— test.ts
|            |—— order.ts
|        |—— test
|            |—— setup.ts
|        |—— utils
|            |—— appCont.ts
|        |—— validators
|    |—— tsconfig.json
|—— payments
|    |—— .dockerignore
|    |—— .env
|    |—— Dockerfile
|    |—— jest.config.js
|    |—— package-lock.json
|    |—— package.json
|    |—— src
|        |—— app.ts
|        |—— controllers
|            |—— paymentController.ts
|        |—— entities
|            |—— Payment.ts
|        |—— helper.ts
|        |—— index.ts
|        |—— interactors
|            |—— paymentInteractor.ts
|        |—— interfaces
|            |—— IPaymentInteractor.ts
|            |—— IPaymentRepository.ts
|        |—— models
|            |—— paymentModel.ts
|        |—— repositories
|            |—— paymentRepository.ts
|        |—— routes
|            |—— __test__
|                |—— test.ts
|            |—— payment.ts
|        |—— test
|            |—— setup.ts
|        |—— utils
|            |—— appCont.ts
|        |—— validators
|    |—— tsconfig.json
|—— products
|    |—— .dockerignore
|    |—— .env
|    |—— Dockerfile
|    |—— jest.config.js
|    |—— package-lock.json
|    |—— package.json
|    |—— src
|        |—— app.ts
|        |—— controllers
|            |—— productController.ts
|        |—— entities
|            |—— Product.ts
|        |—— helper.ts
|        |—— index.ts
|        |—— interactors
|            |—— productInteractor.ts
|        |—— interfaces
|            |—— IProductInteractor.ts
|            |—— IProductRepository.ts
|        |—— models
|            |—— productModel.ts
|        |—— repositories
|            |—— productRepository.ts
|        |—— routes
|            |—— __test__
|                |—— test.ts
|            |—— product.ts
|        |—— test
|            |—— setup.ts
|        |—— utils
|            |—— appCont.ts
|        |—— validators
|    |—— tsconfig.json
|—— skaffold.yml
```
# S-Cart Setup Guide

This guide will walk you through setting up the S-Cart microservices architecture locally using Docker, Kubernetes, Skaffold, and Ingress-NGINX.

## Prerequisites

Make sure you have the following installed:

1. **Docker**
   - Install Docker from the [official site](https://www.docker.com/get-started).
   
2. **kubectl**
   - Kubernetes command-line tool.
   - Follow the [installation guide](https://kubernetes.io/docs/tasks/tools/install-kubectl/) to install `kubectl`.

3. **Ingress-NGINX**
   - Install Ingress-NGINX for routing HTTP requests in Kubernetes.
   - Refer to the official [Ingress-NGINX documentation](https://kubernetes.github.io/ingress-nginx/deploy/#quick-start) for the installation steps.

4. **Skaffold**
   - Skaffold helps with continuous development for Kubernetes applications.
   - Install Skaffold by following the [official guide](https://skaffold.dev/docs/install/).

5. **Local Host Setup**
   - Add the following entry to your local `/etc/hosts` file (on macOS/Linux):
     ```
     127.0.0.1 s-cart.com
     ```
   - On Windows, you can find the hosts file at `C:\Windows\System32\drivers\etc\hosts`.

6. **Kubernetes Secrets**
   - Add the necessary Kubernetes secret for JWT authentication using the following command:
     ```bash
     kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf
     ```
     Replace `asdf` with your actual JWT secret key.

## Starting the Application

To start the application locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/muhammedfahis/s-cart/tree/boiler-code
   cd s-cart
2. Run Skaffold
   ```bash
   skaffold dev

